import React, { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Modal from './Modal';

const Row = (props) => {
  const { row, index, handleClick, isSelected, onClickRow, deleteImage } = props;
  const [open, setOpen] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  const isItemSelected = isSelected(row._id);
  const labelId = `enhanced-table-checkbox-${index}`;


  const toggleModal = row => {
    setModalShown(!!row)
    console.log("modalShown: ", modalShown)
  }

  
  return (      
    < Fragment key={row._id}>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row._id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none" onClick={(e) => { console.log(e); e.stopPropagation(); toggleModal(row)} }>
          {row.title}
        </TableCell>
        <TableCell align="right">{row.username}</TableCell>
        <TableCell align="right">{row.star}</TableCell>
        <TableCell align="right">{row.time}</TableCell>               
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          { modalShown && <Modal onClose={() => toggleModal()} onRemove={deleteImage}>{row}</Modal> }
        </TableCell>
      </TableRow>   
    </Fragment>    
  );
}

export default Row;
