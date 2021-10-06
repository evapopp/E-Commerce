const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryDataAll = await Category.findAll();
    res.json(categoryDataAll);
  }catch (err) {
    console.log ('inside get all categories - this did not work!', err);
    res.status(400).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryDataOne = await Category.findOne({
      where: {
        where: {
          id: req.params.params.id
        },
        includes: {
          model: Product,
          attributes: 'product_name',
        },
      }
    });
    res.status(200).json(categoryDataOne);
  } catch (err) {
    console.log('inside get one category - this did not work', err);
    res.status(400).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log('inside category post -  this did not work!', err)
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updateCategory);
  } catch (err){
    console.log('inside category put - this did not work', err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCateogry = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(deleteCateogry);
  } catch (err) {
    console.log('inside category delete - thjis did not work!', err);
    res.status(400).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
