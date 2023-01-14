import React from 'react';

export default function CreateProgram() {

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)"
            }}
        >
            <div className="absolute bg-black opacity-60 inset-0 z-0" />
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                <div className="grid  gap-8 grid-cols-1">
                    <div className="flex flex-col ">
                        <div className="flex flex-col sm:flex-row items-center">
                            <h2 className="font-semibold text-lg mr-auto">Create Program Account</h2>
                            <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0" />
                        </div>
                        <div className="mt-5">
                            <div className="form">
                                <div className="md:space-y-2 mb-3">

                                    <div className="flex items-center py-2">
                                        <div className="w-36 h-36 mr-4 flex-none rounded-xl border overflow-hidden">
                                            <img
                                                className="w-36 h-36 mr-4 object-cover"
                                                src=""
                                                alt="Pic Upload"
                                            />
                                        </div>
                                        <label className="cursor-pointer ">
                                            <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                                                Upload Program Photo
                                            </span>
                                            <input type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2"> Program Title <abbr title="required">*</abbr>
                                    </label>
                                    <input
                                        placeholder="Enter Program Title"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                        required="required"
                                        type="text"
                                        name="program_title"
                                        id="program_title"
                                    />
                                    <p className="text-red text-xs hidden">
                                        Please fill out this field.
                                    </p>
                                </div>

                                <div class="w-full flex flex-col mb-3 text-xs">
                                    <label className="font-semibold text-gray-600 py-2">  Select Category <abbr title="required">*</abbr></label>
                                    <select class="block w-full bg-white text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="program_category" id="program_category">
                                        <option value="">Bootcamp</option>
                                        <option value="">Competition</option>
                                        <option value="">Course</option>
                                        <option value="">Exchange Program</option>
                                        <option value="">Fellowship</option>
                                        <option value="">Grad School</option>
                                        <option value="">Hackathon</option>
                                        <option value="">High School</option>
                                        <option value="">Internship</option>
                                        <option value="">Masters</option>
                                        <option value="">Undergraduate</option>
                                        <option value="">Primary School</option>
                                    </select>
                                    <p class="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                                </div>

                                <div class="w-full flex flex-col mb-3 text-xs">
                                    <label className="font-semibold text-gray-600 py-2">  Select Year <abbr title="required">*</abbr></label>
                                    <select class="block w-full bg-white text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="program_year" id="program_year">
                                        <option value="">2025</option>
                                        <option value="">2024</option>
                                        <option value="">2023</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                        <option value="">2016</option>
                                        <option value="">2015</option>
                                        <option value="">2014</option>
                                    </select>
                                    <p class="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                                </div>

                                <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                    <label className="font-semibold text-gray-600 py-2">
                                        Program Summary
                                    </label>
                                    <textarea
                                        required="required"
                                        name="program_summary"
                                        id="program_summary"
                                        className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                                        placeholder="Enter Program Summary"
                                        spellCheck="false"
                                        defaultValue={""}
                                    />
                                    <p className="text-xs text-gray-400 text-left my-3">
                                        You inserted 0 characters
                                    </p>
                                </div>

                                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                        {" "}
                                        Cancel{" "}
                                    </button>
                                    <button className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


