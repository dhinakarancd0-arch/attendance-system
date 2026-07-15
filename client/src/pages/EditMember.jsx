import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import {
  Save,
  ArrowBack,
} from "@mui/icons-material";

import "../styles/EditMember.css";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState({
    registerNumber: "",
    name: "",
    dob: "",
    department: "",
    year: "",
  });

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const res = await api.get("/members");

      const selectedMember = res.data.members.find(
        (m) => m._id === id
      );

      if (selectedMember) {
        setMember(selectedMember);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const updateMember = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/members/${id}`, member);

      alert("Member Updated Successfully");

      navigate("/members");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="edit-member-page">

        <Paper className="edit-member-card" elevation={3}>

          <Typography
            variant="h4"
            fontWeight="bold"
            mb={4}
          >
            Edit Member
          </Typography>

          <form onSubmit={updateMember}>

            <div className="form-grid">

              <TextField
                label="Register Number"
                name="registerNumber"
                value={member.registerNumber}
                onChange={handleChange}
                required
              />

              <TextField
                label="Full Name"
                name="name"
                value={member.name}
                onChange={handleChange}
                required
              />

              <TextField
                type="date"
                label="Date of Birth"
                name="dob"
                value={member.dob}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                required
              />

              <TextField
                label="Department"
                name="department"
                value={member.department}
                onChange={handleChange}
                required
              />

              <TextField
                select
                label="Year"
                name="year"
                value={member.year}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">I Year</MenuItem>
                <MenuItem value="2">II Year</MenuItem>
                <MenuItem value="3">III Year</MenuItem>
                <MenuItem value="4">IV Year</MenuItem>
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
                Update Member
              </Button>

            </Box>

          </form>

        </Paper>

      </div>
    </DashboardLayout>
  );
}

export default EditMember;