import React, { useContext } from 'react'
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import languages from '../../../language'
import { LanguageContext } from '../../../context/language'

const columns = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Номер'
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Название'
  },
  {
    id: 'duration',
    numeric: false,
    disablePadding: false,
    label: 'Длительность'
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
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
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
