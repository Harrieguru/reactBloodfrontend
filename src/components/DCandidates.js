import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import DCandidateForm from "./DCandidateForm";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: '1.25rem',
}));

const DCandidates = (props) => {
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllDCandidates();
    }, []); // componentDidMount

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            props.deleteDCandidate(id)
            toast.info("Deleted successfully");
        }
    }

    return (
        <StyledPaper elevation={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Box width="50%">
                    <DCandidateForm {...({ currentId, setCurrentId })} />
                </Box>
                <Box width="50%">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Mobile</StyledTableCell>
                                    <StyledTableCell>Blood Group</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>{record.fullname}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button>
                                                        <Edit color="primary" onClick={() => { setCurrentId(record.id); }} />
                                                    </Button>
                                                    <Button>
                                                        <Delete color="secondary" onClick={() => onDelete(record.id)} />
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </StyledPaper>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
});

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
};

export default connect(mapStateToProps, mapActionToProps)(DCandidates);
