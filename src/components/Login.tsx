import Grid from "@material-ui/core/Grid";
import React from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";

export const Login = () => {

    const formik = useFormik({
        validate: (values) => {
            if(!values.email){
                return {email: "email required"}
            }
            if(!values.password){
                return {password: "password required"}
            }
        },
        initialValues: {
            email: 'free@free.com',
            password: 'free',
            rememberMe: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                label={"Email"}
                                margin={"normal"}
                                type={"email"}
                                {...formik.getFieldProps("email")}
                                error={Boolean(formik.errors.email)}
                                helperText={formik.errors.email}
                            />
                            <TextField
                                label={"Password"}
                                margin={"normal"}
                                type={formik.values.password ? "password" : ''}
                                {...formik.getFieldProps("password")}
                                error={Boolean(formik.errors.password)}
                                helperText={formik.errors.password}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox {...formik.getFieldProps("rememberMe")}
                                              checked={formik.values.rememberMe}
                                    />
                                }
                                label={"remember me"}
                            />
                            <Button type={"submit"} variant={"contained"}
                                    color={"primary"}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}