import React from 'react';

const EditForm = ({ row, handleInputChange, confirmEdit, selectedTable }) => {
    let first, second, third, fourth, fifth, sixth, seventh, eighth, ninth;

    if(selectedTable === "Laptops") {
        first = "assetTag";
        second = "serialNumber";
        third = "status";
        fourth = "brand";
        fifth = "model";
        sixth = "type";
        seventh = "color";
        eighth = "issuedTo";
        ninth = "grant";
    }
  return (


    <tr className="editForm">
    <td>{row.id}</td>
    {selectedTable === "Laptops" ? (
        <>
            <td>
            <input
              onChange={(e) => handleInputChange(first, e.target.value)}
              defaultValue={row[first]}
              placeholder={row[first]}
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(second, e.target.value)}
              defaultValue={row[second]}
              placeholder={row[second]}
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(third, e.target.value)}
              defaultValue={row[third]}
              placeholder={row[third]}
              
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(fourth, e.target.value)}
              defaultValue={row[fourth]}
              placeholder={row[fourth]}
              
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(fifth, e.target.value)}
              defaultValue={row[fifth]}
              placeholder={row[fifth]}
             
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(sixth, e.target.value)}
              defaultValue={row[sixth]}
              placeholder={row[sixth]}
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(seventh, e.target.value)}
              defaultValue={row[seventh]}
              placeholder={row[seventh]}
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(eighth, e.target.value)}
              defaultValue={row[eighth]}
              placeholder={row[eighth]}
            />
          </td>
          <td>
            <input
              onChange={(e) => handleInputChange(ninth, e.target.value)}
              defaultValue={row[ninth]}
              placeholder={row[ninth]}
            />
          </td>
          </>
          ) : selectedTable === "Students" ? (
            <td>
                <input
                onChange={(e) => handleInputChange('description', e.target.value)}
                defaultValue={row.description}
                placeholder="Description"
                />
            </td>
          ) : (
            <td>
                <input
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    defaultValue={row.description}
                    placeholder="Description"
                />
            </td>
          )
        }
      <td>
        <button onClick={confirmEdit}>Confirm</button>
      </td>
    </tr>
  );
};

export default EditForm;
