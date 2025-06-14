import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Card,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../Config/Firebase";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression";

const { Option } = Select;
import { City } from 'country-state-city';



const AddDonor = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [docId, setDocId] = useState(null);

  const handleImageUpload = async ({ file }) => {
    if (!file) return toast.error("No file selected.");

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      setImageFile(compressed);
      setImageURL(URL.createObjectURL(compressed));
      toast.success("Image compressed and preview ready.");
    } catch (error) {
      console.error("Compression Error:", error);
      toast.error("Image compression failed.");
    }
  };

  const uploadImageToStorage = async (file) => {
    try {
      const path = `donors/${uuidv4()}_${file.name}`;
      const imageRef = ref(storage, path);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImagePath(path);
      return { url, path };
    } catch (err) {
      console.error("Image upload error:", err);
      throw err;
    }
  };

  const resetForm = () => {
    form.resetFields();
    setImageFile(null);
    setImageURL(null);
    setImagePath(null);
    setIsUpdate(false);
    setDocId(null);
  };

  const onFinish = async (values) => {
    const toastId = toast.loading(
      isUpdate ? "Updating donor..." : "Submitting donor..."
    );

    try {
      let imgURL = imageURL;
      let imgPath = imagePath;

      if (imageFile) {
        const { url, path } = await uploadImageToStorage(imageFile);
        imgURL = url;
        imgPath = path;
      }

      const donor = { ...values, img: imgURL, imgPath };

      if (isUpdate && docId) {
        await setDoc(doc(db, "donors", docId), donor);
        toast.update(toastId, {
          render: "Donor updated successfully.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        const newId = uuidv4();
        await setDoc(doc(db, "donors", newId), donor);
        toast.update(toastId, {
          render: "Donor added successfully.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      toast.update(toastId, {
        render: "Error submitting donor.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleRead = async () => {
    const password = form.getFieldValue("password");
    if (!password) return toast.error("Enter password to read.");

    const toastId = toast.loading("Fetching donor...");

    try {
      const q = query(
        collection(db, "donors"),
        where("password", "==", password)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const donor = docSnap.data();
        form.setFieldsValue(donor);
        setImageURL(donor.img);
        setImagePath(donor.imgPath || null);
        setDocId(docSnap.id);
        setIsUpdate(true);
        toast.update(toastId, {
          render: "Donor data loaded.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "No matching donor found.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Read error:", error);
      toast.update(toastId, {
        render: "Error fetching donor.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async () => {
    if (!docId) return toast.error("No donor selected to delete.");

    const toastId = toast.loading("Deleting donor...");

    try {
      await deleteDoc(doc(db, "donors", docId));
      if (imagePath) {
        const imgRef = ref(storage, imagePath);
        await deleteObject(imgRef);
      }
      toast.update(toastId, {
        render: "Donor and image deleted.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      resetForm();
    } catch (err) {
      console.error("Delete error:", err);
      toast.update(toastId, {
        render: "Error deleting donor or image.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <ToastContainer position="top-right" />

      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
        <p className="text-red-600 text-lg font-semibold">
          Fill out the donor form below to add new blood donor details.
        </p>
      </div>

      <Card
        title={
          <div className="text-center text-xl text-red-600 font-bold">
            Add New Donor
          </div>
        }
        bordered={false}
        className="shadow-md"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="age" label="Age" rules={[{ required: true }]}>
                <InputNumber min={18} max={60} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="group"
                label="Blood Group"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select group">
                  {["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"].map(
                    (g) => (
                      <Option key={g} value={g}>
                        {g}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="city" label="City" rules={[{ required: true }]}>
                <Select
                  showSearch
                  placeholder="Search or select city"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {City.getCitiesOfCountry("PK").map((city) => (
                    <Option key={city.name} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="contact"
                label="Contact Number"
                rules={[{ required: true }]}
              >
                <Input placeholder="e.g. 0301-1234567" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Enter a password" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Upload Image">
                <Upload
                  showUploadList={false}
                  accept="image/*"
                  customRequest={({ file, onSuccess }) => {
                    handleImageUpload({ file });
                    setTimeout(() => onSuccess("ok"), 0);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload Donor Image</Button>
                </Upload>

                {imageFile && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected:{" "}
                    <span className="font-medium">{imageFile.name}</span>
                  </div>
                )}

                {imageURL && (
                  <div className="mt-2 border border-gray-300 rounded p-2 w-fit">
                    <img
                      src={imageURL}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full border-2 border-red-500"
                    />
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>

          <div className="flex gap-3 flex-wrap mt-4">
            <Button type="primary" htmlType="submit">
              {isUpdate ? "Update" : "Submit"}
            </Button>
            <Button onClick={handleRead}>Read</Button>
            <Button danger onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={resetForm}>Reset</Button>
          </div>
        </Form>
      </Card>
      <div className="mt-6 p-4 border-t border-gray-300 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          🧾 Donor Form Buttons Guide
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
          <li>
            <strong>📤 Submit:</strong>
            Jab aap ek naya donor add karna chahte hain, saare fields (name,
            age, blood group, city, contact, password aur image) complete karne
            ke baad <em>"Submit"</em> button press karein.
            <br />
            👉 Example: Aap ne Ali (25 saal, A+ blood group, Lahore) ka data
            fill kiya, image upload ki — Submit karein.
          </li>

          <li>
            <strong>📥 Read:</strong>
            Agar kisi existing donor ka record dekhna ho, sirf <em>
              Password
            </em>{" "}
            enter karein aur <strong>Read</strong> button dabayein.
            <br />
            🔒 Yeh action password-based search karta hai.
            <br />
            ⚠️ Agar galat password hoga to "No matching donor found" ka error
            milega.
          </li>

          <li>
            <strong>✏️ Update:</strong>
            Jab Read karne ke baad koi field (jaise naam ya contact) change
            karein, toh Submit button automatically <strong>Update</strong> ban
            jaata hai.
            <br />
            🛠️ Isse wahi donor record overwrite ho jata hai.
            <br />
            ✔️ Useful for editing donor info without creating new entry.
          </li>

          <li>
            <strong>🗑️ Delete:</strong>
            Kisi donor ko permanently remove karne ke liye.
            <br />
            🧨 Yeh sirf tab kaam karta hai jab aap Read kar chuke ho.
            <br />
            📷 Donor ki image bhi Firebase Storage se delete ho jaati hai.
            <br />
            ⚠️ Warning: Yeh action irreversible hai.
          </li>

          <li>
            <strong>🔄 Reset:</strong>
            Pure form ko clear karne ke liye.
            <br />
            🧹 Useful jab aap naye donor ka data enter karna chahein ya
            accidentally galat data bhar gaya ho.
          </li>

          <li>
            <strong>🖼️ Image Upload Tip:</strong>
            Sirf image upload se data save nahi hota. Image compress ho jaati
            hai (fast loading ke liye) aur preview bhi dikhai deta hai.
            <br />
            ✅ File size max 0.5 MB hoti hai.
            <br />❌ Image select karne ke baad agar Submit nahi karenge to
            image Firebase pe upload nahi hoti.
          </li>

          <li>
            <strong>🔐 Password Importance:</strong>
            Password har donor ka unique hona chahiye. Yeh Read, Update aur
            Delete operations mein use hota hai.
            <br />
            📛 Same password 2 donors ka nahi hona chahiye warna galat record
            load ho sakta hai.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddDonor;
