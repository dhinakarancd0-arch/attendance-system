import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import DashboardLayout from "../components/DashboardLayout";

import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";

import {
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";

import "../styles/Members.css";

function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/members");

      setMembers(
        res.data.members.map((m) => ({
          id: m._id,
          registerNumber: m.registerNumber,
          name: m.name,
          department: m.department,
          year: m.year,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.registerNumber.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "registerNumber",
      headerName: "Register No",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Year",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() =>
              navigate(`/edit-member/${params.row.id}`)
            }
          >
            <Edit />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              deleteMember(params.row.id)
            }
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="members-page">

        <div className="members-header">

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Member Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              navigate("/add-member")
            }
          >
            Add Member
          </Button>

        </div>

        <Box mb={3}>

          <TextField
            className="search-box"
            label="Search Member"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </Box>

        <Paper className="table-card">

          <DataGrid
            rows={filtered}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
          />

        </Paper>

      </div>
    </DashboardLayout>
  );
}

export default Members;