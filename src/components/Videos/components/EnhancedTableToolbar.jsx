import React from 'react'
import { alpha, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

const EnhancedTableToolbar = ({ numSelected }) => {
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
            {numSelected} видео выбрано
          </Typography>
          )
        : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Видео из плейлиста
          </Typography>
          )}
      {numSelected === 0 && (
        <Tooltip title="Фильтрация">
          <IconButton>
            <FilterListIcon/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default EnhancedTableToolbar
