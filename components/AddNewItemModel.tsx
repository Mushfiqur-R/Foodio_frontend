
'use client';

import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { z } from 'zod';
import axios from 'axios';
import Input from '@/components/InputTextBox';
import Button from '@/components/Button';
import { getAuthConfig } from '@/app/utils/auth';

// Zod validation schema (removed availableForOrder)
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
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

type AddNewItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function AddNewItemModal({ isOpen, onClose, onSuccess }: AddNewItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await axios.get('http://localhost:3000/admin/categories', getAuthConfig());
        setCategories(response.data);
        // Set first category as default
        if (response.data.length > 0 && !formData.category) {
          setFormData(prev => ({ ...prev, category: response.data[0].name }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setUploadError('Failed to load categories');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle file upload
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

  // Handle drag and drop
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

  // Remove uploaded file
  const handleRemoveFile = () => {
    setImageFile(null);
    setUploadError('');
  };

  // Handle form submission
  const handleSubmit = async () => {
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
      // ✅ isAvailable NOT sent - backend will set to true automatically
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('Unauthorized. Please login as admin.');
        setIsSubmitting(false);
        return;
      }

      console.log('📤 Creating menu item...');

      // Send data to backend
      await axios.post('http://localhost:3000/admin/createmenuitem', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('✅ Menu item created successfully!');

      // Success - reset form and close modal
      setFormData({
        name: '',
        price: '',
        category: categories[0]?.name || '',
        description: '',
      });
      setImageFile(null);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('❌ Error creating menu item:', error);
      
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
        setUploadError(error.response?.data?.message || 'Failed to create menu item');
      } else {
        setUploadError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* ✅ Added max-h and overflow for scrolling */}
      <div className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[12px] bg-white p-[32px] shadow-2xl">
        {/* Header */}
        <div className="mb-[24px] flex items-center justify-between sticky top-0 bg-white z-10 pb-4">
          <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Add New Item</h2>
          <button
            onClick={onClose}
            className="text-[#7A7A7A] transition hover:text-[#333333]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-[20px]">
          {/* Name and Price */}
          <div className="flex gap-[16px]">
            <div className="flex-1">
              <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
                Name
              </label>
              <Input
                placeholder="e.g. Cheese Burger"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                width="w-full"
                height="h-[40px]"
              />
              {errors.name && (
                <p className="mt-[4px] text-[12px] text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
                Price
              </label>
              <Input
                placeholder="e.g. 299"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                type="text"
                width="w-full"
                height="h-[40px]"
              />
              {errors.price && (
                <p className="mt-[4px] text-[12px] text-red-500">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Category - Dynamic from database */}
          <div>
            <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
              Category
            </label>
            {isLoadingCategories ? (
              <div className="h-[40px] w-full rounded-[6px] border border-[#E6E2D8] px-[12px] flex items-center text-[#7A7A7A]">
                Loading categories...
              </div>
            ) : categories.length === 0 ? (
              <div className="h-[40px] w-full rounded-[6px] border border-[#E6E2D8] px-[12px] flex items-center text-red-500">
                No categories found. Please add categories first.
              </div>
            ) : (
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="h-[40px] w-full rounded-[6px] border border-[#E6E2D8] px-[12px] text-[16px] text-[#333333] outline-none focus:ring-2 focus:ring-[#0B5D1E]"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className="mt-[4px] text-[12px] text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="h-[100px] w-full resize-none rounded-[6px] border border-[#E6E2D8] px-[12px] py-[8px] text-[16px] text-[#333333] placeholder:text-[#7A7A7A] outline-none focus:ring-2 focus:ring-[#0B5D1E]"
              placeholder="e.g. Delicious grilled chicken with special sauce"
            />
            {errors.description && (
              <p className="mt-[4px] text-[12px] text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-[8px] block text-[14px] font-medium text-[#333333]">
              Image (Optional)
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex h-[100px] w-full cursor-pointer flex-col items-center justify-center rounded-[6px] border-2 border-dashed border-[#E6E2D8] bg-[#FAFAFA] transition hover:bg-[#F5F5F5]"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="mb-[4px] text-[#7A7A7A]" size={20} />
              <p className="text-[12px] text-[#333333]">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="mt-[2px] text-[10px] text-[#7A7A7A]">
                PNG or JPEG (max 2MB)
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {errors.image && (
              <p className="mt-[4px] text-[12px] text-red-500">{errors.image}</p>
            )}

            {/* Uploaded file display */}
            {imageFile && (
              <div className="mt-[8px] flex items-center justify-between rounded-[6px] border border-[#E6E2D8] bg-white px-[12px] py-[8px]">
                <span className="text-[12px] text-[#333333]">
                  {imageFile.name.length > 35
                    ? `${imageFile.name.substring(0, 35)}...`
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

          {/* Info Message */}
          <div className="rounded-[6px] bg-blue-50 p-[10px]">
            <p className="text-[11px] text-blue-600">
              ℹ️ New items are automatically set as "Available for Order"
            </p>
          </div>

          {/* Error message */}
          {uploadError && (
            <div className="rounded-[6px] bg-red-50 p-[10px] text-[12px] text-red-600">
              {uploadError}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-[8px]">
            <Button
              text={isSubmitting ? 'Saving...' : 'Save Changes'}
              onClick={handleSubmit}
              width="w-[140px]"
              height="h-[40px]"
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