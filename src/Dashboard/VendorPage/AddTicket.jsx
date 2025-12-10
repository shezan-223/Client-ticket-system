import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../FirebaseAuth/UseAuth";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AddTicket = () => {
  const { register, handleSubmit, watch,reset } = useForm();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const price = watch("price") || 0;
  const quantity = watch("quantity") || 0;
  const total = price * quantity;

  const ticketSubmit = async (data) => {
    try {
      // FormData for image uploading
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Upload image to backend
      const uploadRes = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = uploadRes.data.url;

      // Final ticket data
      const ticketData = {
         title: data.title,
        from: data.from,
        to: data.to,
        type: data.type,
        price: Number(data.price),
        quantity: Number(data.quantity),
        total: total,
        date: data.date,
        time: data.time,
        perks: Array.isArray(data.perks) ? data.perks : [], // ensure array
        image: imageUrl,
        vendorName: user?.displayName,
        vendorEmail: user?.email,
        status: "pending",
      };

      // Save ticket to DB
      await axiosSecure.post("/tickets", ticketData);

      // SweetAlert success message
      Swal.fire({
        title: "Ticket Added!",
        text: "Your ticket has been successfully submitted.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      // reset() ;
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong while adding the ticket.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">Add a New Ticket</h1>

        <form onSubmit={handleSubmit(ticketSubmit)} className="space-y-4">
          <input
            {...register("title")}
            type="text"
            placeholder="Ticket Title"
            className="input input-bordered w-full"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("from")}
              type="text"
              placeholder="From"
              className="input input-bordered w-full"
            />
            <input
              {...register("to")}
              type="text"
              placeholder="To"
              className="input input-bordered w-full"
            />
          </div>

          <select
            {...register("type")}
            className="select select-bordered w-full"
          >
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Airplane">Airplane</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <label >Ticket Price

            <input
              {...register("price")}
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
            />
            </label>

            <label > Total Quantity

            <input
              {...register("quantity")}
              type="number"
              placeholder="Ticket Quantity"
              className="input input-bordered w-full"
            />
            </label>
          </div>
          <label >
            
          </label> Total Price
            <input
              value={total}
              readOnly
              className="input input-bordered w-full bg-gray-200"
              placeholder="Total Cost "
            />
          <div className="grid grid-cols-2 gap-4">
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("date")}
              type="date"
              className="input input-bordered w-full"
            />
            <input
              {...register("time")}
              type="time"
              className="input input-bordered w-full"
            />
          </div>

          {/* Perks Checkboxes */}
          <label className="font-semibold">Perks:</label>
          <div className="flex gap-4">
            <label>
              <input {...register("perks")} type="checkbox" value="AC" /> AC
            </label>
            <label>
              <input {...register("perks")} type="checkbox" value="Breakfast" />{" "}
              Breakfast
            </label>
            <label>
              <input {...register("perks")} type="checkbox" value="WiFi" /> WiFi
            </label>
          </div>

          {/* Image Upload */}
          <input
            {...register("image")}
            type="file"
            className="file-input file-input-bordered w-full"
          />

          {/* Vendor Info */}
          <input
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
          <input
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />

          <button className="btn btn-primary w-full">Add Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
