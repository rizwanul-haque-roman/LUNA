import React, { useState } from 'react';

function Upload_form() {
//   const [title, setTitle] = useState('');
//   const [marks, setMarks] = useState('');
//   const [description, setDescription] = useState('');
//   const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const assignment = { title, marks, description, url, difficulty, startDate };
    console.log('Assignment created:', assignment);
  };

  return (
    <div className="min-h-screen pt-28 w-11/12 lg:container mx-auto">
      <div>
        <h1 className="text-5xl font-bold">Upload Product</h1>
        <p className="lg:w-3/4 mt-6 text-xl">
          Fill up the full form to upload product to the database.
        </p>
      </div>
      <div className="mt-12 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full mb-12">
          <div className="flex gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-lg font-semibold">
                  Brand Name
                </span>
              </div>
              <input
                type="text"
                placeholder="Name of the brand"
                name="brand"
                className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-[#264790]"
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-lg font-semibold">
                  Product Title
                </span>
              </div>
              <input
                type="text"
                placeholder="i.e Lafz Anti Pollution CC Cream (30ml)"
                name="title"
                className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-[#264790]"
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-lg font-semibold">
                  Price
                </span>
              </div>
              <input
                type="number"
                placeholder="Product price"
                name="price"
                className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-[#264790]"
                required
              />
            </label>
          </div>
          <label className="form-control w-full mt-6">
            <div className="label">
              <span className="label-text text-lg font-semibold">
                Product Description
              </span>
            </div>
            <textarea
              placeholder="Detailed information of product"
              name="description"
              className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-[#264790]"
              required
            />
          </label>
          <label className="form-control w-full mt-6">
            <div className="label">
              <span className="label-text text-lg font-semibold">
                Product Image URL
              </span>
            </div>
            <input
              type="url"
              placeholder="Enter url"
              name="url"
              className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-[#264790]"
              required
            />
          </label>
          <button
            type="submit"
            className="mt-10 btn w-full bg-[#DF8381] hover:bg-[#DE6B87] text-xl text-white font-semibold border-none"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload_form;
