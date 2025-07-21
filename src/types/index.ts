export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  permissions: Permission[];
}

export type UserRole = 'admin' | 'manager' | 'employee' | 'supplier';

export type Permission = 
  | 'create_material_request'
  | 'approve_material_request'
  | 'create_delivery_form'
  | 'approve_delivery'
  | 'create_purchase_form'
  | 'approve_purchase'
  | 'create_quote_request'
  | 'approve_quote'
  | 'evaluate_supplier'
  | 'add_supplier'
  | 'receive_goods'
  | 'return_goods'
  | 'add_inventory'
  | 'add_service_info'
  | 'create_service_request'
  | 'approve_service_request'
  | 'approve_supplier_evaluation';

export interface Material {
  id: string;
  name: string;
  description: string;
  category: MaterialCategory;
  unit: string;
  currentStock: number;
  criticalLevel: number;
  unitPrice: number;
  suppliers: string[];
  artwork?: string;
  specifications?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type MaterialCategory = 'technical' | 'equipment' | 'raw_material' | 'packaging';

export interface MaterialRequest {
  id: string;
  requesterId: string;
  department: string;
  items: MaterialRequestItem[];
  status: RequestStatus;
  requestDate: Date;
  approvedBy?: string;
  approvedDate?: Date;
  notes?: string;
}

export interface MaterialRequestItem {
  materialId: string;
  quantity: number;
  notes?: string;
}

export type RequestStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'completed';

export interface MaterialDelivery {
  id: string;
  requestId: string;
  items: MaterialDeliveryItem[];
  status: DeliveryStatus;
  deliveryDate: Date;
  receivedBy?: string;
  receivedDate?: Date;
  rating?: number;
  notes?: string;
}

export interface MaterialDeliveryItem {
  materialId: string;
  requestedQuantity: number;
  deliveredQuantity: number;
  reason?: string;
}

export type DeliveryStatus = 'prepared' | 'delivered' | 'received' | 'rated';

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: SupplierStatus;
  rating: number;
  evaluations: SupplierEvaluation[];
  materials: string[];
  createdAt: Date;
}

export type SupplierStatus = 'approved' | 'pending' | 'blocked';

export interface SupplierEvaluation {
  id: string;
  supplierId: string;
  evaluatorId: string;
  criteria: EvaluationCriteria;
  totalScore: number;
  date: Date;
  notes?: string;
}

export interface EvaluationCriteria {
  productQuality: number; // 20 points
  specCompliance: number; // 5 points
  timeCompliance: number; // 10 points
  packagingQuality: number; // 5 points
  qualitySystem: number; // 10 points
  commercialRelations: number; // 10 points
  pricingPolicy: number; // 10 points
  technicalSupport: number; // 5 points
  technicalCompetence: number; // 5 points
  accessibility: number; // 10 points
  problemSolving: number; // 5 points
  emergencyResponse: number; // 5 points
}

export interface QuoteRequest {
  id: string;
  materialId: string;
  quantity: number;
  supplierIds: string[];
  specifications: string;
  dueDate: Date;
  status: QuoteStatus;
  createdBy: string;
  createdAt: Date;
}

export type QuoteStatus = 'sent' | 'received' | 'approved' | 'rejected';

export interface Quote {
  id: string;
  requestId: string;
  supplierId: string;
  unitPrice: number;
  totalPrice: number;
  deliveryTime: number;
  validUntil: Date;
  status: QuoteStatus;
  notes?: string;
  receivedAt: Date;
}

export interface PurchaseOrder {
  id: string;
  quoteId: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  orderDate: Date;
  expectedDelivery: Date;
  status: OrderStatus;
  approvedBy: string;
}

export interface PurchaseOrderItem {
  materialId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'draft' | 'sent' | 'confirmed' | 'partial' | 'completed' | 'cancelled';

export interface GoodsReceipt {
  id: string;
  orderId: string;
  invoiceNumber: string;
  receiptDate: Date;
  items: GoodsReceiptItem[];
  receivedBy: string;
  notes?: string;
}

export interface GoodsReceiptItem {
  materialId: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unitPrice: number;
  condition: 'good' | 'damaged' | 'defective';
}

export interface ServiceRecord {
  id: string;
  equipmentId: string;
  equipmentName: string;
  serviceType: 'maintenance' | 'repair' | 'inspection';
  nextServiceDate?: Date;
  lastServiceDate?: Date;
  interval?: number; // in days
  status: ServiceStatus;
}

export type ServiceStatus = 'active' | 'due' | 'overdue' | 'completed';

export interface ServiceRequest {
  id: string;
  equipmentId: string;
  requestType: 'maintenance' | 'repair' | 'inspection';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requestedBy: string;
  requestDate: Date;
  status: RequestStatus;
  approvedBy?: string;
  scheduledDate?: Date;
}

export interface StockMovement {
  id: string;
  materialId: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  fromLocation?: string;
  toLocation?: string;
  reference: string; // order ID, request ID, etc.
  date: Date;
  performedBy: string;
}

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  data: any;
  generatedBy: string;
  generatedAt: Date;
  filters: ReportFilters;
}

export type ReportType = 
  | 'most_consumed_products'
  | 'most_requesting_department'
  | 'least_requesting_department'
  | 'least_consumed_products'
  | 'least_ordered_products'
  | 'price_change_rate'
  | 'inflation_rate';

export interface ReportFilters {
  dateFrom?: Date;
  dateTo?: Date;
  materialIds?: string[];
  departments?: string[];
  supplierIds?: string[];
}