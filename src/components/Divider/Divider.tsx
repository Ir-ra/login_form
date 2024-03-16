import Divider from "@mui/material/Divider";

export default function Divider_or() {
  return (
    <>
      <Divider
        sx={{
          marginBottom: "50px",
          marginTop: "50px",
          color: "grey",
          "&.MuiDivider-root": {
            fontSize: "16px",
            lineHeight: "1.25",
          },
          "&.MuiDivider-root::after": {
            borderTop: "thin solid grey",
          },
          "&.MuiDivider-root::before": {
            borderTop: "thin solid grey",
          },
        }}
      >
        <span>
          or
        </span>
      </Divider>
    </>
  )
}
