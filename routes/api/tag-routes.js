const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.json(tagData);
  } catch (err) {
    res.json('something wrong');
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [{model: Product}],
    });
    res.json(tagData);
  } catch (err) {
    res.json('something wrong');
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((deadTag) => {
    res.json(deadTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.get('/producttags', (req, res) => {
  ProductTag.findAll().then((data) => {res.json(data)})
})

module.exports = router;
