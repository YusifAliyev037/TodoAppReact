import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Modals = ({ isOpen, onClose, item, onUpDate }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSaveChanges = () => {
    onUpDate(item.id, editedItem);
    onClose();
  };

  if (!isOpen || !item) { 
    return null;
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column gap-2'>
        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={editedItem.title} 
            onChange={handleInputChange}
            className='bg-light rounded border-primary text-dark'
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            name="desc"
            value={editedItem.desc} 
            onChange={handleInputChange}
            className='bg-light rounded border-primary text-dark'
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleSaveChanges}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

function List({ list, onRemove, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  const handleUpdateItem = (id, updatedItem) => {
    onUpdate(id, updatedItem);
  };

  return (
    <ListGroup className='p-5 mx-auto'>
      {list?.map((item, index) => (
        <ListGroup.Item
          className=' d-flex justify-content-between'
          key={item.id}
        >
          {index + 1}. {item.title} | {item.desc}
          <div>
            <button onClick={() => onRemove(item.id)}><MdDelete color='red' /></button>
            <button onClick={() => handleOpenModal(item)}><FaEdit color='green' /></button>
          </div>
        </ListGroup.Item>
      ))}
      <Modals isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} onUpDate={handleUpdateItem} />
    </ListGroup>
  );
}

export default List;
