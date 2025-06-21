import { useState, useRef } from "react";
import { Phone, MessageCircle, Facebook, Image as ImageIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { insertContactRequestSchema, type InsertContactRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";

const services = [
  "Pressure Washing",
  "Landscaping", 
  "Concrete Sealing",
  "Junk Removal",
  "Painting",
  "Gutter Cleaning",
  "Lawn Mowing",
  "Pool Cleaning",
  "Moving Services",
  "Driveway Salting",
  "Snow Removal",
  "Brush Clearing",
  "Multiple Services"
];

// Extended form schema including the image field
interface ExtendedFormData extends InsertContactRequest {
  image?: FileList;
}

// Interface for dialog data
interface SuccessDialogData {
  show: boolean;
  formData?: ExtendedFormData;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successDialog, setSuccessDialog] = useState<SuccessDialogData>({ show: false });
  
  // Handle image selection
  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };
  
  // Function to send SMS via SMS URL scheme when user clicks the button
  const sendDirectSms = (data: ExtendedFormData) => {
    const ownerPhone = "270-704-2207";
    
    // Format the message with appropriate details
    const message = `
New Property Request from ${data.name}

Phone: ${data.phone}
${data.email ? `Email: ${data.email}\n` : ''}
Service Needed: ${data.service}

Project Details: ${data.description}

${selectedImage ? '(Image attached in separate message)' : ''}
`.trim();
    
    // Format the SMS URL
    const smsUrl = `sms:${ownerPhone}?body=${encodeURIComponent(message)}`;
    
    // Open the SMS app
    window.open(smsUrl, '_blank');
    
    toast({
      title: "SMS App Opened",
      description: "Please send the pre-filled message to complete your request. If you added an image, please attach it manually to your message.",
    });
    
    // Close the dialog
    setSuccessDialog({ show: false });
  };
  
  // No need for a separate upload function anymore - we'll send the image with the form data

  const form = useForm<ExtendedFormData>({
    resolver: zodResolver(insertContactRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      description: "",
      image: undefined,
    },
  });

  const onSubmit = async (data: ExtendedFormData) => {
    // Validate required fields
    if (!data.name || !data.phone) {
      toast({
        title: "Please check form",
        description: "Name and phone number are required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file upload
      const formData = new FormData();
      
      // Add text fields
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('service', data.service || '');
      formData.append('description', data.description || '');
      
      // If email is empty, make sure it's an empty string instead of null/undefined
      formData.append('email', data.email || '');
      
      // Add image if selected
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      
      // Submit to backend API (which will save to Google Sheets)
      const response = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Handle successful submission
      if (response.data.success) {
        // Show success dialog with SMS option
        setSuccessDialog({
          show: true,
          formData: data  // Pass the original form data
        });
        
        // Get the photo URL from response if available
        const photoUrl = response.data.photoUrl;
        console.log('Photo uploaded and available at:', photoUrl);
        
        // Reset form
        form.reset();
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        throw new Error(response.data.message || 'Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-dark-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Property?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Contact McKinney Total Property Care LLC today for a free estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="bg-gray-800 rounded-xl p-8 mb-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                <p className="text-lg text-gray-300 mb-6">
                  We're here to help with all your property maintenance needs. Reach out today and experience the McKinney difference.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-blue p-3 rounded-full">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Call or Text</h3>
                      <a href="tel:270-704-2207" className="text-lg text-gray-300 hover:text-white">
                        270-704-2207
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-blue p-3 rounded-full">
                      <Facebook className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Follow Us</h3>
                      <a 
                        href="https://www.facebook.com/profile.php?id=61577748385741" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                      >
                        McKinney Total Property Care LLC
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-success-green mr-3">✓</div>
                    <span>Fully licensed and insured professionals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-success-green mr-3">✓</div>
                    <span>Competitive pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-success-green mr-3">✓</div>
                    <span>High-quality work with attention to detail</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-success-green mr-3">✓</div>
                    <span>Reliable service when you need it most</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="tel:270-704-2207"
                className="bg-success-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
              <a
                href="sms:270-704-2207"
                className="bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-blue transition-colors flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Text Message
              </a>
            </div>
          </div>

          <div className="bg-white text-dark-gray rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Request Free Estimate</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(270) 555-0123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address <span className="text-sm text-gray-400">(Optional)</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          {...field} 
                          value={field.value || ''} 
                          onChange={(e) => {
                            // If field is empty, set to empty string instead of invalid email
                            if (!e.target.value) {
                              field.onChange("");
                            } else {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        We'll only use this to follow up if needed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Services Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Property Photo <span className="text-sm text-gray-400">(Optional)</span></FormLabel>
                  <div className="flex flex-col space-y-2">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary-blue transition-colors"
                    >
                      {imagePreview ? (
                        <div className="relative w-full">
                          <img 
                            src={imagePreview} 
                            alt="Property preview" 
                            className="max-h-40 mx-auto rounded-md object-contain" 
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-white/80 p-1 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload a photo of your property</p>
                          <p className="text-xs text-gray-400 mt-1">(Helps us better understand your needs)</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => handleImageChange(e.target.files)}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-blue hover:bg-secondary-blue"
                  >
                    {isSubmitting ? "Processing..." : "Send Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Success Dialog with SMS Option */}
      <Dialog 
        open={successDialog.show} 
        onOpenChange={(isOpen) => setSuccessDialog({ ...successDialog, show: isOpen })}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Check className="h-6 w-6 mr-2 text-success-green" />
              Request Submitted!
            </DialogTitle>
            <DialogDescription className="text-lg pt-2">
              Thank you for contacting McKinney Total Property Care LLC. We've received your request and will be in touch soon!                
            </DialogDescription>
          </DialogHeader>
          
          <div className="pt-4 space-y-4">
            <p className="text-gray-700">
              Want to send your request directly via SMS as well?
            </p>
            
            <Button
              className="w-full bg-primary-blue hover:bg-secondary-blue"
              onClick={() => successDialog.formData && sendDirectSms(successDialog.formData)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Send via SMS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
