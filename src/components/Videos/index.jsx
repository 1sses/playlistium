import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Checkbox,
  Paper, Table, TableBody,
  TableCell, TableContainer, TablePagination,
  TableRow
} from '@mui/material'
import EnhancedTableHead from './components/EnhancedTableHead'
import EnhancedTableToolbar from './components/EnhancedTableToolbar'
import convertTime from '../../utils/convertTime'
import getPaginationButtonTitles from '../../utils/getPaginationButtonTitles'
import { LanguageContext } from '../../context/language'

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}
function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const Videos = ({ videos, selected, setSelected }) => {
  const language = useContext(LanguageContext)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [tablePaginationProps, setTablePaginationProps] = useState({})

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = videos.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - videos.length) : 0

  useEffect(() => {
    if (language.current === 'en') {
      setTablePaginationProps({})
    } else {
      setTablePaginationProps({
        labelDisplayedRows: ({ from, to, count }) => `${from}-${to} из ${count}`,
        getItemAriaLabel: getPaginationButtonTitles,
        labelRowsPerPage: 'Элементов на странице:'
      })
    }
  }, [language.current])

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={3}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={videos.length}
            />
            <TableBody>
              {videos.sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId
                                }}
                            />
                          </TableCell>
                          <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{convertTime(row.duration, language.current)}</TableCell>
                        </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                  <TableRow style={{
                    height: 53 * emptyRows
                  }}>
                    <TableCell colSpan={6} />
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={videos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showLastButton={true}
            showFirstButton={true}
            {...tablePaginationProps}
        />
      </Paper>
    </Box>
  )
}

export default Videos
