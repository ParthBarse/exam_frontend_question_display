import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({filterInActiveUsers}) {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value)
    filterInActiveUsers(event.target.value)
    console.log(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="Category" className=''>Category</InputLabel>
        <Select
          labelId="Category"
          id="Category"
          value={status}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"cancel"}>Cancelled</MenuItem>
          <MenuItem value={"refunded"}>Refunded</MenuItem>
          <MenuItem value={"extended"}>Extended</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
