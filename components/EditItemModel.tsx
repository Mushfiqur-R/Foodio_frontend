// 'use client';

// import { useState, useEffect } from 'react';
// import { X, Upload } from 'lucide-react';
// import { z } from 'zod';
// import axios from 'axios';
// import Input from '@/components/InputTextBox';
// import Button from '@/components/Button';

// // Zod validation schema
// const menuItemSchema = z.object({
//   name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
//   price: z.string().min(1, 'Price is required').refine(
//     (val) => !isNaN(Number(val)) && Number(val) > 0,
//     'Price must be a positive number'
//   ),
//   category: z.string().min(1, 'Category is required'),
//   description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
//   image: z.instanceof(File).optional().refine(
//     (file) => !file || file.size <= 2 * 1024 * 1024,
//     'Image size must be maximum 2MB'
//   ).refine(
//     (file) => !file || ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
//     'Only PNG and JPEG formats are supported'
//   ),
//   availableForOrder: z.boolean(),
// });

// type MenuItem = {
//   id: string | number;
//   name: string;
//   price: string;
//   category: string;
//   description: string;
//   image?: string; // existing image URL/path
//   availableForOrder: boolean;
// };

// type EditItemModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
//   item: MenuItem | null; // Item to edit
// };

// export default function EditItemModal({ isOpen, onClose, onSuccess, item }: EditItemModalProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     category: 'Starters',
//     description: '',
//     availableForOrder: false,
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [existingImage, setExistingImage] = useState<string>('');
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadError, setUploadError] = useState('');

//   // Pre-fill form when item changes
//   useEffect(() => {
//     if (item) {
//       setFormData({
//         name: item.name,
//         price: item.price.replace('$', ''), // Remove $ sign if present
//         category: item.category,
//         description: item.description,
//         availableForOrder: item.availableForOrder,
//       });
//       setExistingImage(item.image || '');
//       setImageFile(null); // Reset new image file
//     }
//   }, [item]);

//   // Handle input changes
//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     // Clear error for this field
//     if (errors[field]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   // Handle file upload
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setUploadError('');
//       if (errors.image) {
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors.image;
//           return newErrors;
//         });
//       }
//     }
//   };

//   // Handle drag and drop
//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setUploadError('');
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   // Remove uploaded file (but keep existing image)
//   const handleRemoveFile = () => {
//     setImageFile(null);
//     setUploadError('');
//   };

//   // Remove existing image
//   const handleRemoveExistingImage = () => {
//     setExistingImage('');
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!item) return;

//     try {
//       setErrors({});
//       setIsSubmitting(true);

//       // Validate form data
//       const validatedData = menuItemSchema.parse({
//         ...formData,
//         image: imageFile || undefined,
//       });

//       // Prepare FormData for file upload
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', validatedData.name);
//       formDataToSend.append('price', validatedData.price);
//       formDataToSend.append('category', validatedData.category);
//       formDataToSend.append('description', validatedData.description);
//       formDataToSend.append('availableForOrder', String(validatedData.availableForOrder));
      
//       // Only append new image if one was selected
//       if (imageFile) {
//         formDataToSend.append('image', imageFile);
//       }

//       // If existing image was removed, indicate that
//       if (!existingImage && !imageFile) {
//         formDataToSend.append('removeImage', 'true');
//       }

//       // Send data to backend (PUT or PATCH request)
//       await axios.patch(`http://localhost:3000/admin/updatemenuitem/${item.id}`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//            getAuthConfig()
//         },
//       });

//       // Success - close modal
//       onSuccess?.();
//       onClose();
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         // Handle validation errors
//         const newErrors: Record<string, string> = {};
//         error.issues.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as string] = err.message;
//           }
//         });
//         setErrors(newErrors);
//       } else if (axios.isAxiosError(error)) {
//         // Handle API errors
//         setUploadError(error.response?.data?.message || 'Failed to update menu item');
//       } else {
//         setUploadError('An unexpected error occurred');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen || !item) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="relative w-[480px] rounded-[12px] bg-white p-[32px] shadow-2xl">
//         {/* Header */}
//         <div className="mb-[24px] flex items-center justify-between">
//           <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Edit Item</h2>
//           <button
//             onClick={onClose}
//             className="text-[#7A7A7A] transition hover:text-[#333333]"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="space-y-[20px]">
//           {/* Name and Price */}
//           <div className="flex gap-[16px]">
//             <div className="flex-1">
//               <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
//                 Name
//               </label>
//               <Input
//                 placeholder=""
//                 value={formData.name}
//                 onChange={(e) => handleInputChange('name', e.target.value)}
//                 width="w-full"
//                 height="h-[40px]"
//               />
//               {errors.name && (
//                 <p className="mt-[4px] text-[12px] text-red-500">{errors.name}</p>
//               )}
//             </div>
//             <div className="flex-1">
//               <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
//                 Price
//               </label>
//               <Input
//                 placeholder=""
//                 value={formData.price}
//                 onChange={(e) => handleInputChange('price', e.target.value)}
//                 type="text"
//                 width="w-full"
//                 height="h-[40px]"
//               />
//               {errors.price && (
//                 <p className="mt-[4px] text-[12px] text-red-500">{errors.price}</p>
//               )}
//             </div>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
//               Category
//             </label>
//             <select
//               value={formData.category}
//               onChange={(e) => handleInputChange('category', e.target.value)}
//               className="h-[40px] w-full rounded-[6px] border border-[#E6E2D8] px-[12px] text-[16px] text-[#333333] outline-none focus:ring-2 focus:ring-[#0B5D1E]"
//             >
//               <option value="Starters">Starters</option>
//               <option value="Main Course">Main Course</option>
//               <option value="Desserts">Desserts</option>
//               <option value="Beverages">Beverages</option>
//               <option value="Appetizers">Appetizers</option>
//             </select>
//             {errors.category && (
//               <p className="mt-[4px] text-[12px] text-red-500">{errors.category}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
//               Description
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => handleInputChange('description', e.target.value)}
//               className="h-[100px] w-full resize-none rounded-[6px] border border-[#E6E2D8] px-[12px] py-[8px] text-[16px] text-[#333333] placeholder:text-[#7A7A7A] outline-none focus:ring-2 focus:ring-[#0B5D1E]"
//               placeholder=""
//             />
//             {errors.description && (
//               <p className="mt-[4px] text-[12px] text-red-500">{errors.description}</p>
//             )}
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
//               Image
//             </label>

//             {/* Show existing image if present */}
//             {existingImage && !imageFile && (
//               <div className="mb-[12px] flex items-center justify-between rounded-[6px] border border-[#E6E2D8] bg-white px-[12px] py-[8px]">
//                 <div className="flex items-center gap-[8px]">
//                   <span className="text-[14px] text-[#333333]">
//                     {existingImage.split('/').pop()?.substring(0, 30) || 'Current image'}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleRemoveExistingImage}
//                   className="text-[#7A7A7A] transition hover:text-[#333333]"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             )}

//             {/* Upload new image area */}
//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               className="flex h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-[6px] border-2 border-dashed border-[#E6E2D8] bg-[#FAFAFA] transition hover:bg-[#F5F5F5]"
//               onClick={() => document.getElementById('file-upload-edit')?.click()}
//             >
//               <Upload className="mb-[8px] text-[#7A7A7A]" size={24} />
//               <p className="text-[14px] text-[#333333]">
//                 Drag <span className="font-medium">or click here</span> to upload
//               </p>
//               <p className="mt-[4px] text-[12px] text-[#7A7A7A]">
//                 Size must be maximum 2mb. Supported formats: PNG & JPEG
//               </p>
//               <input
//                 id="file-upload-edit"
//                 type="file"
//                 accept="image/png,image/jpeg,image/jpg"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="mt-[4px] text-[12px] text-red-500">{errors.image}</p>
//             )}

//             {/* New uploaded file display */}
//             {imageFile && (
//               <div className="mt-[12px] flex items-center justify-between rounded-[6px] border border-[#E6E2D8] bg-white px-[12px] py-[8px]">
//                 <div className="flex items-center gap-[8px]">
//                   <span className="text-[14px] text-[#333333]">
//                     {imageFile.name.length > 30
//                       ? `${imageFile.name.substring(0, 30)}...`
//                       : imageFile.name}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleRemoveFile}
//                   className="text-[#7A7A7A] transition hover:text-[#333333]"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Available for Order Toggle */}
//           <div className="flex items-center gap-[12px]">
//             <button
//               type="button"
//               onClick={() => handleInputChange('availableForOrder', !formData.availableForOrder)}
//               className={`h-[20px] w-[20px] rounded-full border-2 transition ${
//                 formData.availableForOrder
//                   ? 'border-[#0B5D1E] bg-[#0B5D1E]'
//                   : 'border-[#E6E2D8] bg-white'
//               }`}
//             >
//               {formData.availableForOrder && (
//                 <div className="flex h-full items-center justify-center">
//                   <div className="h-[8px] w-[8px] rounded-full bg-white" />
//                 </div>
//               )}
//             </button>
//             <label className="text-[14px] text-[#333333]">Available for Order</label>
//           </div>

//           {/* Error message */}
//           {uploadError && (
//             <div className="rounded-[6px] bg-red-50 p-[12px] text-[14px] text-red-600">
//               {uploadError}
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end pt-[8px]">
//             <Button
//               text={isSubmitting ? 'Saving...' : 'Save Changes'}
//               onClick={handleSubmit}
//               width="w-[160px]"
//               height="h-[40px]"
//               bgColor="#1A3C34"
//               textColor="#FFFFFF"
//               className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { z } from 'zod';
import axios from 'axios';
import Input from '@/components/InputTextBox';
import Button from '@/components/Button';
import { getAuthConfig } from '@/app/utils/auth';

// Zod validation schema
const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  price: z.string().min(1, 'Price is required').refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    'Price must be a positive number'
  ),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  image: z.instanceof(File).optional().refine(
    (file) => !file || file.size <= 2 * 1024 * 1024,
    'Image size must be maximum 2MB'
  ).refine(
    (file) => !file || ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
    'Only PNG and JPEG formats are supported'
  ),
  availableForOrder: z.boolean(),
});

type MenuItem = {
  id: string | number;
  name: string;
  price: string;
  category: string;
  description: string;
  image?: string;
  availableForOrder: boolean;
  rawPrice?: number;
};

type EditItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  item: MenuItem | null;
};

export default function EditItemModal({ isOpen, onClose, onSuccess, item }: EditItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    availableForOrder: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Pre-fill form when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        price: item.rawPrice?.toString() || item.price.replace(/[৳$]/g, '').trim(), // Remove currency symbols
        category: item.category,
        description: item.description,
        availableForOrder: item.availableForOrder,
      });
      setExistingImage(item.image || '');
      setImageFile(null);
    }
  }, [item]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadError('');
      if (errors.image) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadError('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setImageFile(null);
    setUploadError('');
  };

  const handleRemoveExistingImage = () => {
    setExistingImage('');
  };

  const handleSubmit = async () => {
    if (!item) return;

    try {
      setErrors({});
      setIsSubmitting(true);
      setUploadError('');

      // Validate form data
      const validatedData = menuItemSchema.parse({
        ...formData,
        image: imageFile || undefined,
      });

      // Prepare FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', validatedData.name);
      formDataToSend.append('price', validatedData.price);
      formDataToSend.append('categoryName', validatedData.category); // ✅ Backend expects categoryName
      formDataToSend.append('description', validatedData.description);
      formDataToSend.append('isAvailable', String(validatedData.availableForOrder)); // ✅ Backend expects isAvailable
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (!existingImage && !imageFile) {
        formDataToSend.append('removeImage', 'true');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('Unauthorized. Please login again.');
        return;
      }

      console.log('📤 Updating menu item...');

      // Send data to backend with auth token
      await axios.patch(
        `http://localhost:3000/admin/updatemenuitem/${item.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // ✅ Auth token added
          },
        }
      );

      console.log('✅ Menu item updated successfully!');

      // Success - close modal
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('❌ Error updating menu item:', error);
      
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data);
        setUploadError(error.response?.data?.message || 'Failed to update menu item');
      } else {
        setUploadError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* ✅ Added max-h-[90vh] and overflow-y-auto for better height handling */}
      <div className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[12px] bg-white p-[32px] shadow-2xl">
        {/* Header - Sticky */}
        <div className="mb-[20px] flex items-center justify-between sticky top-0 bg-white z-10 pb-4">
          <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Edit Item</h2>
          <button
            onClick={onClose}
            className="text-[#7A7A7A] transition hover:text-[#333333]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form - Reduced spacing */}
        <div className="space-y-[16px]">
          {/* Name and Price */}
          <div className="flex gap-[12px]">
            <div className="flex-1">
              <label className="mb-[6px] block text-[13px] font-medium text-[#333333]">
                Name
              </label>
              <Input
                placeholder="e.g. Cheese Burger"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                width="w-full"
                height="h-[38px]"
              />
              {errors.name && (
                <p className="mt-[4px] text-[11px] text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="mb-[6px] block text-[13px] font-medium text-[#333333]">
                Price
              </label>
              <Input
                placeholder="e.g. 299"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                type="text"
                width="w-full"
                height="h-[38px]"
              />
              {errors.price && (
                <p className="mt-[4px] text-[11px] text-red-500">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-[6px] block text-[13px] font-medium text-[#333333]">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="h-[38px] w-full rounded-[6px] border border-[#E6E2D8] px-[12px] text-[14px] text-[#333333] outline-none focus:ring-2 focus:ring-[#0B5D1E]"
            >
              <option value="Starters">Starters</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
              <option value="Appetizers">Appetizers</option>
            </select>
            {errors.category && (
              <p className="mt-[4px] text-[11px] text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-[6px] block text-[13px] font-medium text-[#333333]">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="h-[80px] w-full resize-none rounded-[6px] border border-[#E6E2D8] px-[12px] py-[8px] text-[14px] text-[#333333] placeholder:text-[#7A7A7A] outline-none focus:ring-2 focus:ring-[#0B5D1E]"
              placeholder="e.g. Delicious grilled chicken"
            />
            {errors.description && (
              <p className="mt-[4px] text-[11px] text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Image Upload - Compact */}
          <div>
            <label className="mb-[6px] block text-[13px] font-medium text-[#333333]">
              Image (Optional)
            </label>

            {/* Existing image */}
            {existingImage && !imageFile && (
              <div className="mb-[8px] flex items-center justify-between rounded-[6px] border border-[#E6E2D8] bg-white px-[10px] py-[6px]">
                <span className="text-[12px] text-[#333333]">
                  {existingImage.split('/').pop()?.substring(0, 25) || 'Current image'}
                </span>
                <button
                  onClick={handleRemoveExistingImage}
                  className="text-[#7A7A7A] transition hover:text-[#333333]"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Upload area - Smaller */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex h-[90px] w-full cursor-pointer flex-col items-center justify-center rounded-[6px] border-2 border-dashed border-[#E6E2D8] bg-[#FAFAFA] transition hover:bg-[#F5F5F5]"
              onClick={() => document.getElementById('file-upload-edit')?.click()}
            >
              <Upload className="mb-[4px] text-[#7A7A7A]" size={20} />
              <p className="text-[12px] text-[#333333]">
                <span className="font-medium">Click to upload</span> or drag
              </p>
              <p className="mt-[2px] text-[10px] text-[#7A7A7A]">
                PNG/JPEG (max 2MB)
              </p>
              <input
                id="file-upload-edit"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {errors.image && (
              <p className="mt-[4px] text-[11px] text-red-500">{errors.image}</p>
            )}

            {/* New uploaded file */}
            {imageFile && (
              <div className="mt-[8px] flex items-center justify-between rounded-[6px] border border-[#E6E2D8] bg-white px-[10px] py-[6px]">
                <span className="text-[12px] text-[#333333]">
                  {imageFile.name.length > 25
                    ? `${imageFile.name.substring(0, 25)}...`
                    : imageFile.name}
                </span>
                <button
                  onClick={handleRemoveFile}
                  className="text-[#7A7A7A] transition hover:text-[#333333]"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Available for Order Toggle */}
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => handleInputChange('availableForOrder', !formData.availableForOrder)}
              className={`h-[18px] w-[18px] rounded-full border-2 transition ${
                formData.availableForOrder
                  ? 'border-[#0B5D1E] bg-[#0B5D1E]'
                  : 'border-[#E6E2D8] bg-white'
              }`}
            >
              {formData.availableForOrder && (
                <div className="flex h-full items-center justify-center">
                  <div className="h-[7px] w-[7px] rounded-full bg-white" />
                </div>
              )}
            </button>
            <label className="text-[13px] text-[#333333]">Available for Order</label>
          </div>

          {/* Error message */}
          {uploadError && (
            <div className="rounded-[6px] bg-red-50 p-[10px] text-[12px] text-red-600">
              {uploadError}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-[6px]">
            <Button
              text={isSubmitting ? 'Saving...' : 'Save Changes'}
              onClick={handleSubmit}
              width="w-[140px]"
              height="h-[38px]"
              bgColor="#1A3C34"
              textColor="#FFFFFF"
              className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}