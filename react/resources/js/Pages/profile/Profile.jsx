import Dashboard from "@/Layouts/Dashboard";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const [edit, setEdit] = useState(false)
  const { auth } = usePage().props;
  
  const { data, setData, post, processing, errors } = useForm({
    name: auth?.user?.profile.name,
    email: auth?.user?.profile.email,
    avatar: auth?.user?.profile.avatar ?? null,
    birthdate: auth?.user?.profile.birthdate,
    address: auth?.user?.profile.address,
    city: auth?.user?.profile.city,
    state: auth?.user?.profile.state,
    country: auth?.user?.profile.country,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('profile.update')); // 👈 Make sure this route exists
  };

  const handleEdit = () => {
    setEdit(true);
  }

  return (
    <Dashboard>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl p-8 mx-auto space-y-6 bg-white shadow-md rounded-2xl"
      >
        <div className="flex justify-between pb-2 border-b">
          <h2 className="text-2xl font-bold text-gray-800 ">
            Edit Profile
          </h2>
          <button type="button" onClick={handleEdit}>
            <FiEdit className="w-6 h-6" />
          </button>
        </div>
        {/* Input Group */}
        <InputField label="Full Name" name="name" value={data.name} edit={edit} errors={errors} onChange={setData} />
        <InputField label="Email ID" name="email" value={data.email} edit={edit} errors={errors} onChange={setData} />

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Avatar</label>
          <input
            type="file"
            name="avatar"
            readOnly={!edit ? "readOnly" : ""}
            onChange={(e) => setData("avatar", e.target.files[0])}
            className="block p-2 border rounded"
          />
          {errors.avatar && <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>}
        </div>

        <InputField label="Birthdate" name="birthdate" type="date" value={data.birthdate} edit={edit} errors={errors} onChange={setData} />
        <InputField label="Address" name="address" value={data.address} edit={edit} errors={errors} onChange={setData} />
        <InputField label="City" name="city" value={data.city} edit={edit} errors={errors} onChange={setData} />
        <InputField label="State" name="state" value={data.state} edit={edit} errors={errors} onChange={setData} />
        <InputField label="Country" name="country" value={data.country} edit={edit} errors={errors} onChange={setData} />

        <button
          type="submit"
          disabled={processing}
          className={`w-full py-2.5 bg-indigo-600 text-white font-medium rounded-md transition ${!edit ? "opacity-75" : "hover:bg-indigo-700"}`}
        >
          {processing ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </Dashboard>
  );
};

// Reusable input component
const InputField = ({ label, name, value, onChange, edit, type = "text", errors }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      readOnly={!edit ? "readOnly" : ""}
      onChange={(e) => onChange(name, e.target.value)}
      className={`p-2 border rounded ${!edit ? "focus:border-0 border-gray-300 opacity-75 bg-gray-300" : ''}`}
    />
    {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
  </div>
);

export default Profile;