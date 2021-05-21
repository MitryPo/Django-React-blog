import React, { useState } from 'react'
import { TextField, InputAdornment,  Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'relative',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))


export default function SearchBar() {
	const [data, setData] = useState('')
	const classes = useStyles()
	const history = useHistory()

	const Search = () => {
		if (data === 0)
			return
		history.push({
			pathname: '/search/',
			search: `?search=${data}`
		})
	}

	return (
		<div className={classes.search}>
			<TextField
				value={data}
				onChange={(e) => setData(e.target.value)}
				id="standard-search"
				label="Поиск публикаций"
				type="search"
				InputProps={{
					endAdornment: (
					  <InputAdornment position="end">
						
					  </InputAdornment>
					),
				  }}
			>
			</TextField>
			<IconButton onClick={Search}>
				<SearchIcon />
			</IconButton>
		</div>
	)
}
