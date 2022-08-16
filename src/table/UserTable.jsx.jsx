import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import data from "../data.json"
import SearchIcon from '@mui/icons-material/Search';


const headerData = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "username", label: "Username", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "phon", label: "Phone", minWidth: 170 },
    { id: "website", label: "Website", minWidth: 170 },
    { id: "companyname", label: "Company Name", minWidth: 170 }

]
const styles = theme => ({
    tableRow: {
        "&:hover": {
            backgroundColor: "blue !important"
        }
    }
});
const UserTable = () => {
    let url = "https://jsonplaceholder.typicode.com/users"

    const [datas, setDatas] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setDatas(data)

        } catch (error) {
        }
    }

    const classes = styles();
    const [page, SetPage] = useState(0)
    const [rowsPerPage, SetRowsPerPage] = useState(8)
    const [search, SetSearch] = useState("")

    const handleChangePage = (event, newpage) => {
        SetPage(newpage)
    }
    const handleChangeRowsPerPage = (e) => {
        SetRowsPerPage(e.target.value)
    }
    const handleChange = (e) => {
        SetSearch(e.target.value)
    }
    return (
        <>
            <Container maxWidth="lg">
                <Card style={{ marginTop: "5rem" }}>
                    <CardContent>
                        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>User Table Data</h1>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <FormControl sx={{ m: 1, width: '25ch' }} size='small' variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type='search'
                                    size='small'
                                    onChange={handleChange}
                                    value={search}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Search"
                                />
                            </FormControl>
                            <TableContainer sx={{ maxHeight: 540 }} >
                                <Table stickyHeader className={classes.tableRow} >
                                    <TableHead>
                                        <TableRow>
                                            {
                                                headerData.map((header, i) => {
                                                    return (
                                                        <TableCell
                                                            key={header.id}
                                                            style={{ minWidth: header.minWidth }}
                                                        >
                                                            <b>  {header.label}</b>
                                                        </TableCell>
                                                    )

                                                })
                                            }
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>

                                        {
                                            datas.filter((val) => {
                                                if (search.trim() === "") {
                                                    return val
                                                } else if (val.name.toLowerCase().includes(search.toLowerCase()) ||
                                                    val.username.toLowerCase().includes(search.toLowerCase()) ||
                                                    val.phone.toLowerCase().includes(search.toLowerCase()) ||
                                                    val.email.toLowerCase().includes(search.toLowerCase()) ||
                                                    val.company.name.toLowerCase().includes(search.toLowerCase()) ||
                                                    val.website.toLowerCase().includes(search.toLowerCase())) {
                                                    return val
                                                }
                                            }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((item, i) => {
                                                    const { id, name, username, email, phone, website, company } = item;
                                                    return (
                                                        <TableRow hover key={id}>
                                                            <TableCell>{name}</TableCell>
                                                            <TableCell>{username}</TableCell>
                                                            <TableCell>{email}</TableCell>
                                                            <TableCell>{phone}</TableCell>
                                                            <TableCell>{website}</TableCell>
                                                            <TableCell>{company.name}</TableCell>

                                                        </TableRow>
                                                    )
                                                })
                                        }
                                    </TableBody>
                                </Table>

                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[8, 25, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default UserTable
