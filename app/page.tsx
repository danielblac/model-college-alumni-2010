"use client";
import { BsBank2 } from "react-icons/bs";
import { CircularProgress, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dialog } from "@mui/material";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs(""));
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    occupation: "",
    memory: "",
    dob: "",
  });

  useEffect(() => {
    const dateValue = value?.format("DD-MM-YYYY");

    setFormData({
      ...formData,
      dob: dateValue as string,
    });
  }, [value]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      console.log(data);
      setSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        occupation: "",
        memory: "",
        dob: "",
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
  };

  return (
    <main>
      <div className="header">
        <BsBank2 size={50} />
        <h1>L.M.S.C.O Class of 2010</h1>
        <p>
          This form provides your information to the admins for record purposes
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="label">Name</p>
        <div className="name">
          <div className="input-div">
            <TextField
              id="filled-basic"
              label="First Name"
              variant="filled"
              value={formData.first_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  first_name: e.target.value,
                });
              }}
              fullWidth
              required
            />
          </div>
          <div className="input-div">
            <TextField
              id="filled-basic"
              label="Last Name"
              variant="filled"
              value={formData.last_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  last_name: e.target.value,
                });
              }}
              fullWidth
              required
            />
          </div>
        </div>
        <p className="label">Phone</p>
        <div className="name">
          <div className="input-div-full">
            <TextField
              id="filled-basic"
              label="Phone Number"
              variant="filled"
              value={formData.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  phone: e.target.value,
                });
              }}
              fullWidth
              required
            />
          </div>
        </div>
        <p className="label">Email</p>
        <div className="name">
          <div className="input-div-full">
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              type="email"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
              fullWidth
            />
          </div>
        </div>
        <p className="label">Date of Birth </p>
        <div className="name">
          <div className="input-div-full">
            <DemoItem>
              <DatePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                className="date-picker"
              />
            </DemoItem>
          </div>
        </div>
        <p className="label">Occupation</p>
        <div className="name">
          <div className="input-div-full">
            <TextField
              id="filled-basic"
              label="Occupation"
              variant="filled"
              value={formData.occupation}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  occupation: e.target.value,
                });
              }}
              fullWidth
            />
          </div>
        </div>
        <p className="label">Memories at School</p>
        <div className="name">
          <div className="input-div-full">
            <TextField
              multiline
              rows={5}
              id="filled-basic"
              label="Memories"
              variant="filled"
              value={formData.memory}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  memory: e.target.value,
                });
              }}
              fullWidth
            />
          </div>
        </div>
        <div className="button">
          <button type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress color="inherit" size={30} thickness={5} />
            ) : (
              <p>Submit</p>
            )}
          </button>
        </div>
      </form>
      <Dialog
        maxWidth="xs"
        open={submitted}
        onClose={handleClose}
        scroll="body"
      >
        <div className="dialog">
          <img src="/images/thanks.gif" alt="thanks" />
          <h2>Thanks</h2>
          <p>Your Entry was Successful!</p>
          <button className="ok" onClick={handleClose}>
            Okay
          </button>
        </div>
      </Dialog>
    </main>
  );
}
