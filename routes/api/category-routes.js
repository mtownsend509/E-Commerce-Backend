const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const catData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.json(catData);
  } catch (err) {
    res.json('something wrong');
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catData = await Category.findOne(
    { where: {id:req.params.id},
      include: [{model: Product}],
    });
    res.json(catData);
  } catch (err) {
    res.json('something wrong');
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCat) => {
    res.json(newCat);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((updatedCat) => {
    res.json(updatedCat);
  }).catch((err) => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deleteCat) => {
    res.json(deleteCat);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
