import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { dCandidate } from "../reducers/dCandidate";
import * as actions from "../actions/dCandidate";
import { ButtonGroup, Grid,Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles,Button } from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import { Edit } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DCandidates = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    // toast msg.
    const {addToast} = useToasts();

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])//componentDidMount
    


    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id, addToast("Deleted successfully",{ appearance: 'info'}))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullname}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><Edit color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><Delete color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));