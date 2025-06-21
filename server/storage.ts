import { contactRequests, type ContactRequest, type InsertContactRequest } from "@shared/schema";

export interface IStorage {
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getContactRequests(): Promise<ContactRequest[]>;
}

export class MemStorage implements IStorage {
  private contactRequests: Map<number, ContactRequest>;
  private currentId: number;

  constructor() {
    this.contactRequests = new Map();
    this.currentId = 1;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentId++;
    const request: ContactRequest = {
      ...insertRequest,
      email: insertRequest.email || null, // Convert undefined to null
      id,
      createdAt: new Date(),
    };
    this.contactRequests.set(id, request);
    return request;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values());
  }
}

export const storage = new MemStorage();
