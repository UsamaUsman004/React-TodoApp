import { useFormik } from "formik";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import * as yup from 'yup';
import { useEffect, useState } from "react"
import { collection, addDoc, onSnapshot, query, serverTimestamp, orderBy, deleteDoc, doc } from "firebase/firestore"
import { db } from '../firebase'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];




const todoCol = collection(db, "todo")

const validationSchema = yup.object({
  title: yup
    .string('Enter your email')
    .required('Email is required'),
});

async function del(id) {
  await deleteDoc(doc(todoCol, id));
}

function RealtimeTodo() {
  const [todo, settodo] = useState([])

  useEffect(() => {

    const q = query(todoCol, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      let temp = [];
      snapshot.forEach((doc) => {

        let id = doc.id;
        let data = doc.data();

        temp.unshift({
          id: id,
          title: data.title,
          description: data.description
        });
      })
      settodo(temp)
    });

    return () => {
      unsubscribe()
      console.log("unsub")
    };
  }, []);

  const formik = useFormik({

    initialValues: {
      title: "",
      description: ""
    },
    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(todoCol, {
          title: values.title,
          description: values.description,
          timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    validationSchema: validationSchema,
  });


  return (
    <Box sx={{ flexGrow: 1, m: 2 }} >

      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Realtime Todo
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Title"
            variant="outlined"

            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}

            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Description"
            variant="outlined"

            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}

            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />

          <Button fullWidth variant="contained" color="primary" type="submit">Add Todo</Button>
        </Stack>

      </form>

      <TableContainer component={Paper} sx={{ marginTop: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell align="right">Task Name</TableCell>
              <TableCell align="right">Task Description </TableCell>
              <TableCell align="right">Task Action </TableCell>


            </TableRow>
          </TableHead>


          <TableBody>

            {todo.map((eachTodo, i) => {

              return (

                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                  <TableCell component="th" scope="row">{eachTodo.id}</TableCell>
                  <TableCell align="right">{eachTodo.title}</TableCell>
                  <TableCell align="right">{eachTodo.description}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" onClick={() => { del(eachTodo.id) }}>Delete</Button>
                  </TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default RealtimeTodo;