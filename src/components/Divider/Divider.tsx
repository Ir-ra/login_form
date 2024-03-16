import Divider from "@mui/material/Divider";

export default function Divider_or() {
  return (
    <>
      <Divider
        sx={{
          marginBottom: "30px",
          marginTop: "30px",
          color: "#BEC5CC",
          "&.MuiDivider-root": {
            fontSize: "12px",
            lineHeight: "1.33",
            fontWeight: '500'
          },
          "&.MuiDivider-root::after": {
            borderTop: "thin solid #E3E6E9",
          },
          "&.MuiDivider-root::before": {
            borderTop: "thin solid #E3E6E9",
          },
        }}
      >
        <span>
          OR
        </span>
      </Divider>
    </>
  )
}
