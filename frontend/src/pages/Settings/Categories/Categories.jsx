import React, { useEffect, useState } from 'react';
import IconButton from '../../../components/UI/Buttons/IconButton';
import Input from '../../../components/UI/Input';
import Select from '../../../components/UI/Select';
import { catchHandler } from '../../../utils/error_handling/error_handling';
import { sendData } from '../../../utils/functions/basic';

function Categories(props) {
  const { isOpen } = props;
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Types of transactions
  const types = [{ id: 1, title: 'expence' }, { id: 2, title: 'income' }];

  useEffect(() => {
    getCategories();
  }, []);

  // get categories
  async function getCategories() {
    try {
      const result = await sendData('GET', '/get_categories');
      if (result) setCategories(result);
      else return;
    } catch (error) {
      catchHandler(error, 'getCategories');
    }
  }

  function chooseType(choose) {
    setEditingCategory({ ...editingCategory, type: choose.title });
  }

  function renameCategory(e) {
    setEditingCategory({ ...editingCategory, title: e.target.value });
  }

  function validateCategory() {
    const { title, type } = editingCategory;
    if (!title || !type) return false;
    return true;
  }

  async function categoryHandler(action, id) {
    try {
      const reqData = { action };
      switch (action) {
        case 'edit': {
          reqData.category = editingCategory; // add category object
          const validate = validateCategory(); // validation's result
          if (validate) { // if category passed validation
            const result = await sendData('POST', '/handle_categories', reqData); // send request to DB
            if (result === 'success') {
              setEditingCategory(null); // reset editing category state
              await getCategories(); // refresh categories
            } else return;
          } else return;
        }
          break;

        case 'delete': {
          const confirm = window.confirm('Delete?');
          if (confirm) {
            reqData.id = id; // add category id
            const result = await sendData('POST', '/handle_categories', reqData); // send request to DB
            if (result === 'success') await getCategories(); // refresh categories
            else return;
          } else return;
        }
          break;

        default: return;
      }
    } catch (error) {
      catchHandler(error, 'getCategories');
    }
  }

  return (
    <div className={isOpen ? 'categories categories_active' : 'categories'}>
      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            <td className="table__data">Title</td>
            <td className="table__data">Type</td>
            <td className="table__data" />
          </tr>

        </thead>
        <tbody className="table__body">

          {categories.map((category) => {
            const { id, type, title } = category;
            const isEditing = editingCategory?.id === category.id;
            return (
              <tr className="table__row" key={id}>

                <td className="table__data">
                  {isEditing
                    ? (
                      <Input
                        invalid={!editingCategory?.title}
                        placeholder="title"
                        defaultValue={title}
                        onChange={renameCategory}
                      />
                    ) : title}
                </td>

                <td className="table__data">
                  {isEditing
                    ? (
                      <Select
                        id="settings__categories"
                        array={types}
                        onChoose={chooseType}
                        defaultValue={editingCategory?.type || type}
                      />
                    ) : type}
                </td>

                <td id={isEditing ? 'button-block_active' : 'button-block'} className="table__data">
                  {!isEditing && <IconButton icon="delete" onClick={() => categoryHandler('delete', id)} />}
                  {!isEditing && <IconButton icon="edit" onClick={() => setEditingCategory(category)} />}
                  {isEditing && <IconButton icon="confirm" onClick={() => categoryHandler('edit')} />}
                  {isEditing && <IconButton icon="cancel" onClick={() => setEditingCategory(null)} />}
                </td>
              </tr>
            );
          })}

        </tbody>
        <tfoot className="table__foot" />
      </table>
    </div>
  );
}

export default Categories;
