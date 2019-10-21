import moment from 'moment';
import Sequelize from 'sequelize';
import chrono from 'chrono-node';
import db from '../models';

const createSites = (data) => db.hectvSites.findOrCreate({
  where: { handle: data.handle },
  defaults: {
    name: data.siteName,
    handle: data.handle,
    uri: data.uri,
  },
});

const createEvents = (data, siteId) => db.hectvEvents.findOrCreate({
  where: { handle: data.handle },
  defaults: {
    uri: data.uri,
    name: data.eventName,
    handle: data.handle,
    date: data.date,
    startDate: data.startDate,
    endDate: data.endDate,
    price: data.price ? data.price : '',
    location: data.location,
    address1: data.address ? data.address.address1 : '',
    address2: data.address ? data.address.address2 : '',
    city: data.address ? data.address.city : '',
    zip: data.address ? data.address.zip : '',
    phone: data.phone,
    description: JSON.parse(JSON.stringify(data.description)),
    image: data.image,
    siteId,
  },
});

const createPost = (data) => db.wpPosts.findOrCreate({
  where: { guid: data.handle },
  defaults: {
    post_author: 0,
    post_title: data.name,
    post_content: data.description ? data.description : '',
    post_excerpt: data.description ? data.description.substring(0, 100) : '',
    post_status: 'draft',
    post_type: 'event',
    post_name: data.name
      ? `${data.name
        .toLowerCase()
        .replace(/\s/gi, '-')
        .replace(/[^\-a-zA-Z0-9]+/gi, '')}-${data.id}`
      : '',
    guid: data.handle,
    post_parent: 0,
    menu_order: 0,
    post_date_gmt: moment.utc(),
    post_modified_gmt: moment.utc(),
  },
});

const updatePost = (data) => new Promise((resolve) => db.wpPosts
  .update(
    {
      post_author: 0,
      post_title: data.name,
      post_content: data.description ? data.description : '',
      post_excerpt: data.description
        ? data.description.substring(0, 100)
        : '',
      post_type: 'event',
      post_name: data.name
        ? `${data.name
          .toLowerCase()
          .replace(/\s/gi, '-')
          .replace(/[^\-a-zA-Z0-9]+/gi, '')}-${data.id}`
        : '',
      guid: data.handle,
      post_parent: 0,
      menu_order: 0,
      post_modified_gmt: moment.utc(),
    },
    {
      where: { guid: data.handle },
    },
  )
  .then(() => resolve(db.wpPosts.findOne({ where: { guid: data.handle } }))));

const createPostmeta = (id, key, value) => db.wpPostmeta.findOrCreate({
  where: { post_id: id, meta_key: key },
  defaults: {
    post_id: id,
    meta_key: key,
    meta_value: value,
  },
});

const findLikePostmeta = (id, key, value) => db.wpPostmeta.findOne({
  where: {
    post_id: id,
    meta_key: {
      [Sequelize.Op.like]: [`%${key}%`],
    },
    meta_value: value,
  },
});

const updatePostmeta = (id, key, value) => db.wpPostmeta.update(
  {
    post_id: id,
    meta_key: key,
    meta_value: value,
  },
  {
    where: { post_id: id, meta_key: key },
  },
);

const createOrUpdatePostmeta = async (id, key, value) => new Promise((resolve, reject) => {
  /* eslint-disable no-console */
  createPostmeta(id, key, value)
    .then(([newPostmeta, created]) => {
      if (!created) {
        updatePostmeta(id, key, value).then((updates) => {
          resolve(updates);
        });
      } else {
        resolve(newPostmeta);
      }
    })
    .catch((err) => {
      console.log(`Error Creating Post: ${err.message}`);
      reject(err);
    });
  /* esline-enable no-console */
});

const cuEvent = async (id, key, value, startDate, endDate) => new Promise((resolve, reject) => {
  /* eslint-disable no-console */
  const index = value - 1;
  console.log(`EVENTS - start time: ${startDate}. end time: ${endDate}`);
  findLikePostmeta(id, '_end_time', endDate).then(async (postmeta) => {
    if (postmeta) {
      resolve(true);
    } else {
      try {
        await createPostmeta(id, `event_dates_${index}_end_time`, endDate);
      } catch (err) {
        console.log(`Error at event_dates_${index}_end_time`);
        reject(err);
      }
      try {
        await createPostmeta(
          id,
          `event_dates_${index}_start_time`,
          startDate,
        );
      } catch (err) {
        console.log(`Error at event_dates_${index}_start_time`);
        reject(err);
      }
      try {
        const hasEvent = await createPostmeta(id, key, value);
        if (!hasEvent.created) {
          await cuEvent(id, key, value + 1, startDate, endDate);
        }
        resolve(postmeta);
      } catch (err) {
        console.log(`Error at ${key}`);
        reject(err);
      }
    }
  });
});

const createOrUpdatePostmetaHelper = (postId, event) => Promise.all([
  createOrUpdatePostmeta(
    postId,
    'venue',
    event.location ? event.location : '',
  ),
  createOrUpdatePostmeta(
    postId,
    'event_price',
    event.price ? event.price : '',
  ),
  createOrUpdatePostmeta(postId, 'web_address', event.handle),
  createOrUpdatePostmeta(postId, 'external_image', event.image),
  createOrUpdatePostmeta(postId, 'event_date_info', event.date),
]);

const createOrUpdatePostHelper = async (event, newPost) => {
  if (event.date) {
    try {
      const startDate = chrono.casual.parseDate(event.startDate);
      const endDate = chrono.casual.parseDate(event.endDate);
      if (startDate && endDate) {
        console.log(
          `Postmeta EVENTS  - startDate: ${startDate}. endDate: ${endDate}`,
        );
        await cuEvent(
          newPost.id,
          'event_dates',
          1,
          moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
          moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        );
      } else {
        console.log(`INVALID START DATE  - ${event.startDate} - ${startDate}.`);
        console.log(`INVALID END DATE  - ${event.endDate} - ${endDate}.`);
      }
    } catch (error) {
      console.log(`Error creating or updating event date. ${error.message}`);
    }
  }
  try {
    await createOrUpdatePostmetaHelper(newPost.id, event);
  } catch (err) {
    console.log(`Error creating postmeta data. ${err.message}`);
  }
};

const createOrUpdatePost = async (event, created) => new Promise((resolve, reject) => {
  /* eslint-disable no-console */
  if (created) {
    createPost(event)
      .then(async ([newPost]) => {
        console.log(`Creating Postmeta: ${newPost.id}`);
        await createOrUpdatePostHelper(event, newPost);
        resolve(newPost);
      })
      .catch((err) => {
        console.log(`Error Creating Postmeta: ${err.message}`);
        reject(err);
      });
  } else {
    updatePost(event)
      .then(async (updatedPost) => {
        console.log(`Updating Postmeta - Event id: ${event.id}.`);
        await createOrUpdatePostHelper(event, updatedPost);
        resolve(updatedPost);
      })
      .catch((err) => {
        console.log(`Error Updating Postmeta: ${err.message}`);
        reject(err);
      });
  }
  /* esline-enable no-console */
});

export default ({ data }) => new Promise((resolve, reject) => {
  /* eslint-disable no-console */
  db.sequelize
    .authenticate()
    .then(() => {
      try {
        createSites(data)
          .then(async ([site]) => {
            try {
              const response = await Promise.all(
                data.events.map(
                  (e) => e
                      && createEvents(e, site.id)
                        .then(([event, created]) => createOrUpdatePost(event, created))
                        .catch((err) => {
                          console.error(
                            `Failed to create or update post: ${err.message}`,
                          );
                        }),
                ),
              );
              resolve(response);
            } catch (err) {
              console.error(`Failed to create events: ${err.message}`);
              reject(err);
            }
          })
          .catch((err) => {
            console.error(`Failed to generate responses: ${err.message}`);
            reject(err);
          });
      } catch (err) {
        console.log(`Database error: ${err.message}`);
        reject(err);
      }
    })
    .catch((err) => {
      console.log('Unable to connect to the database:', err);
    });
  /* esline-enable no-console */
});
