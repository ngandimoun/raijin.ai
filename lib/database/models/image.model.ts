import { Document, Schema, model } from "mongoose";

export interface IMedia extends Document {
  title: string;
  description: string;
  tags: [string];
  mediaType: 'image' | 'video';
  secureURL: string;
  price: number;
  currency: string;
  purchaseLink: string;
  contactInfo: {
    email?: string;
    phoneNumber?: string;
    socialProfiles?: [string];
  };
  location?: string;
  availability?: string;
  productDetails: {
    use: string;
    targetDemographic?: string;
    dimensions?: string;
    color?: string;
    suitability?: string;
    uniqueSellingPoints: [string];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const MediaSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Indexed
  tags: [{ type: String, required: true, index: true }], // Indexed for better search performance
  mediaType: { type: String, required: true, enum: ['image', 'video'], index: true }, // Indexed
  secureURL: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  purchaseLink: { type: String },
  contactInfo: {
    email: { type: String },
    phoneNumber: { type: String },
    socialProfiles: [{ type: String }]
  },
  location: { type: String, index: true }, 
  availability: { type: String },
  productDetails: {
    use: { type: String },
    targetDemographic: { type: String },
    dimensions: { type: String },
    color: { type: String },
    suitability: { type: String },
    uniqueSellingPoints: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Creating a compound index for a common query pattern, if necessary
// For example, if users frequently search for media by tags and description
MediaSchema.index({ tags: 1, description: 1 }); // i need to check again 

const Media = model<IMedia>('Media', MediaSchema);

export default Media;
