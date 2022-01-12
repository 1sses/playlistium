import React, { useContext, useState } from 'react'
import { alpha, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { LanguageContext } from '../../../context/language'
import languages from '../../../language'

const EnhancedTableToolbar = ({ numSelected }) => {
  const language = useContext(LanguageContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const filterOpen = Boolean(anchorEl)
  const openFilter = event => {
    setAnchorEl(event.currentTarget)
  }
  const closeFilter = () => setAnchorEl(null)

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0
        ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} {languages[language.current].videos.selectedCount}
          </Typography>
          )
        : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {languages[language.current].videos.tableTitle}
          </Typography>
          )}
      {numSelected === 0 && (
        <>
          <Tooltip title={languages[language.current].videos.filter}>
            <IconButton onClick={openFilter}>
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
          <Menu
            open={filterOpen}
            anchorEl={anchorEl}
            onClose={closeFilter}
          >
            <MenuItem onClick={closeFilter}>In develop</MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  )
}

export default EnhancedTableToolbar
