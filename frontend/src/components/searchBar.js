import React, { useState } from 'react'
import { TextField, Grid, Container, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	searchButton: {
		marginLeft: theme.spacing(1),
	},
	search: {
		display: 'flex',
	},
	container: {
		paddingTop: theme.spacing(15),
	},
}))


export default function SearchBar() {
	const [data, setData] = useState('')
	const classes = useStyles()


	const Search = () => {
		if (data === 0)
			return
		window.location.assign(`/search/?search=${data}`)
	}

	return (
		<Container className={classes.container}>
			<Grid
				container
				direction="row"
				justify='center'
				alignItems='center'
			>
				<Grid md={10} sm={10} xs={12} className={classes.search}>
					<TextField
						value={data}
						variant='outlined'
						onChange={(e) => setData(e.target.value)}
						id="standard-search"
						label="Поиск публикаций"
						type="search"
						fullWidth
					>
					</TextField>
					<Button
						className={classes.searchButton}
						onClick={Search}
						variant='contained'
						disableElevation
					>
						<SearchIcon />
					</Button>
				</Grid>
			</Grid>
		</Container>
	)
}
