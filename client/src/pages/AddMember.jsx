import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import DashboardLayout from "../components/DashboardLayout";

import {
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

import { Save, ArrowBack } from "@mui/icons-material";

import "../styles/AddMember.css";

function AddMember() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registerNumber: "",
    name: "",
    dob: "",
    department: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveMember = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/members", formData);

      alert(res.data.message);

      navigate("/members");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add member"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="add-member-page">

        <Paper className="add-member-card" elevation={3}>

          <Typography
            variant="h4"
            fontWeight="bold"
            mb={4}
          >
            Add Member
          </Typography>

          <form onSubmit={saveMember}>

            <div className="form-grid">

              <TextField
                label="Register Number"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleChange}
                required
              />

              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

             <TextField
  fullWidth
  type="date"
  name="dob"
  label="Date of Birth"
  value={formData.dob}
  onChange={handleChange}
  slotProps={{
    inputLabel: {
      shrink: true,
    },
  }}
/>

              <TextField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />

              <TextField
                select
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">
                  I Year
                </MenuItem>

                <MenuItem value="2">
                  II Year
                </MenuItem>

                <MenuItem value="3">
                  III Year
                </MenuItem>

                <MenuItem value="4">
                  IV Year
                </MenuItem>

              </TextField>

            </div>

            <Box className="button-group">

              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/members")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
              >
                Save Member
              </Button>

            </Box>

          </form>

        </Paper>

      </div>
    </DashboardLayout>
  );
}

export default AddMember;