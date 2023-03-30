import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Input } from "@mui/material";

RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helpertext: PropTypes.node
}
export default function RHFTextField({ name, control, helpertext, ...other }) {

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              fullWidth
              rows={5}
              error={!!error}
              {...other}
            />
            {error?.message && <p style={{ color: "red" }}>{error.message}</p>}
          </>

        )}
      />
    </>
  );
}
