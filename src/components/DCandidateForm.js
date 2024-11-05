import React, { useState, useEffect } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormHelperText,
    Box,
    FormLabel
} from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import useForm from "./useForm";

const initialFieldValues = {
    fullname: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}



const DCandidateForm = (props) => {
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullname' in fieldValues)
            temp.fullname = fieldValues.fullname ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required."
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                toast.success("Submitted successfully");
            }
            if (props.currentId === 0)
                props.createDCandidate(values, onSuccess)
            else
                props.updateDCandidate(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dCandidateList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId]);

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                <Box width="50%" padding={1}>
                    <TextField
                        name="fullname"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullname}
                        onChange={handleInputChange}
                        {...(errors.fullname && { error: true, helperText: errors.fullname })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <FormControl variant="outlined" fullWidth {...(errors.bloodGroup && { error: true })}>
                        <InputLabel ref={inputLabel} shrink>Blood Group</InputLabel>
                        <Select
                            id="blood-group"
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Box>
                <Box width="50%" padding={1}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(DCandidateForm);
