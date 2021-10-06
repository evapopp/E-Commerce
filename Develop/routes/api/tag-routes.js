const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagsDataAll = await Tag.findAll();
    res.json(tagsDataAll);
  }catch (err) {
    console.log ('inside get all tags - this did not work!', err);
    res.status(400).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsDataOne = await Tag.findOne({
        where: {
          id: req.params.params.id
        },
        includes: {
          model: Product,
          through: ProductTag,
          attributes: ['product_name', 'price', 'stock', 'category_id'],
        },
    });
    res.status(200).json(categoryDataOne);
  } catch (err) {
    console.log('inside get one tag - this did not work', err);
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.log('inside new tag post -  this did not work!', err)
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updateTag);
  } catch (err){
    console.log('inside tag put - this did not work', err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(deleteTag);
  } catch (err) {
    console.log('inside tag delete - thjis did not work!', err);
    res.status(400).json(err);
  }
});

module.exports = router;
