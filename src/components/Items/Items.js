import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useItems } from '../../hooks/useItems';
import { toggleListItem, createListItem } from '../../services/items';

export default function Items() {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);

  const { items, setItems } = useItems();
  const { user } = useContext(UserContext);

  // TODO -- redirect the user back to auth if there is not a current user
  if (!user) {
    return <Redirect to='/auth/sign-in' />;
  }

  const handleClick = async (item) => {
    try {
      const updatedItem = await toggleListItem(item);
      setItems((prevItems) =>
        prevItems.map((prevItem) => (prevItem.id === item.id ? updatedItem : prevItem))
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const handleNewItem = async () => {
    try {
      await createListItem(name, qty);
      setItems((prev) => [...prev, { name, qty }]);
      setName('');
      setQty(0);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <div className="box m-5">
      {items.map((item) => (
        <div key={item.id}>
          <label className="checkbox">
            <input
              className="m-1"
              type="checkbox"
              checked={item.purchased}
              onClick={() => handleClick(item)}
            />
            {item.qty} {item.name}
          </label>
        </div>
      ))}
      <div className="field is-grouped m-2">
        <input
          className="input m-2"
          type="text"
          placeholder="new item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input m-2"
          type="number"
          placeholder="qty"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <button className="button is-primary m-2" onClick={handleNewItem}>
          Add
        </button>
      </div>
    </div>
  );
}
