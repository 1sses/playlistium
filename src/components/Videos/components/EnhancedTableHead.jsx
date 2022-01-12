import React, { useContext } from 'react'
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import languages from '../../../language'
import { LanguageContext } from '../../../context/language'

const columns = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Номер',
    width: '5%'
  },
  {
    id: 'title',
    disablePadding: false,
    label: 'Название',
    width: '85%'
  },
  {
    id: 'duration',
    disablePadding: false,
    label: 'Длительность',
    width: '10%'
  }
]

function EnhancedTableHead ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const language = useContext(LanguageContext)

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'Select all'
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {languages[language.current].videos[headCell.id]}
              {orderBy === headCell.id
                ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                  )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
