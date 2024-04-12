"use client";
import { BsBank2 } from "react-icons/bs";
import { CircularProgress, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dialog } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs(""));
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    dob: "",
    class: "",
    occupation: "",
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        address: "",
        state: "",
        class: "",
        occupation: "",
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
        <Image
          src="/images/logo.png"
          alt="lsmco icon"
          width={150}
          height={150}
        />
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
        <p className="label">Address</p>
        <div className="name">
          <div className="input-div-full">
            <TextField
              id="filled-basic"
              label="Address"
              variant="filled"
              required
              value={formData.address}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  address: e.target.value,
                });
              }}
              fullWidth
            />
          </div>
        </div>
        <p className="label">State</p>
        <div className="name">
          <div className="input-div-full">
            <TextField
              id="filled-basic"
              label="State"
              variant="filled"
              placeholder="Enter State of Origin"
              required
              value={formData.state}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  state: e.target.value,
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
        <p className="label">Class</p>
        <div className="name">
          <div className="input-div-full">
            <TextField
              id="filled-basic"
              label="Class"
              variant="filled"
              placeholder="e.g SS3A"
              required
              value={formData.class}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // setFullNameError(false);
                setFormData({
                  ...formData,
                  class: e.target.value,
                });
              }}
              fullWidth
            />
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
