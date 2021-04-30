import React from 'react';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const classes = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})
)

const Filter = ({ searchRows }) => {

  const [selected, setSelected] = React.useState('username');
  const [searched, setSearched] = React.useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const search = () => {
    searchRows(selected, searched)
  }
  const captureReturnKey = (e) => { 
    setSearched(e.target.value);
    if(e.keyCode==13) search();
    return false; 
  } 

  return (
    <div className="col-xs-12 col-sm-12 col-md-4">
      <div>
        <div>
          <Paper className={classes.root} >
            <Box padding={2}>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  value={selected}
                  onChange={handleChange}
                  name="criteria"
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'criteria' }}
                >
                  <option value='username'>작성자</option>
                  <option value='item'>제품명</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <Box padding={2}>
              <InputBase
                className={classes.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                name="searching"
                onKeyUp={captureReturnKey}
              />
              <IconButton type="button" className={classes.iconButton} aria-label="search" onClick={search}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default Filter;