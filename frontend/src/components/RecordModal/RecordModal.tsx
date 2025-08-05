import React, { Component, ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { connect } from 'react-redux';

import { fetchTruckingCompanies } from '../../store/truckingCompanySlice';
import { fetchVessels } from '../../store/vesselSlice';
import { fetchFees } from '../../store/feeSlice';

interface Fee {
  fee_name: string;
  amount: number;
}

interface FeeDefinition {
  fee_name: string;
  description: string;
  default_value: number;
  status: string;
  id: number;
  created_by: number | null;
}

interface RecordData {
  destination: string;
  record_date: string;
  record_time: string;
  vessel_id: number;
  trucking_company_id: number;
  plate_number: string;
  contact_info: string;
  weight_1: number;
  weight_2: number;
  fees: Fee[];
}

interface Props {
  isOpen: boolean;
  mode: 'add' | 'edit';
  initialData?: RecordData;
  onClose: () => void;
  onSubmit: (data: RecordData) => void;
  truckingCompanies: any[];
  vessels: any[];
  feeList: FeeDefinition[];
  fetchTruckingCompanies: () => void;
  fetchVessels: () => void;
  fetchFees: () => void;
}

interface State {
  formData: RecordData;
}

class RecordModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formData: props.initialData || this.getEmptyForm(),
    };
  }

  componentDidMount() {
    this.props.fetchTruckingCompanies();
    this.props.fetchVessels();
    this.props.fetchFees();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.isOpen &&
      this.props.initialData !== prevProps.initialData &&
      this.props.mode === 'edit'
    ) {
      this.setState({
        formData: this.props.initialData || this.getEmptyForm(),
      });
    }

    if (this.props.isOpen && this.props.mode === 'add' && prevProps.isOpen !== this.props.isOpen) {
      this.setState({ formData: this.getEmptyForm() });
    }

    if (
      this.props.mode === 'add' &&
      this.props.isOpen &&
      this.props.feeList !== prevProps.feeList
    ) {
      this.setState({ formData: this.getEmptyForm() });
    }
  }

  getEmptyForm(): RecordData {
    const { feeList } = this.props;

    const defaultFees: Fee[] = feeList.map(fee => ({
      fee_name: fee.fee_name,
      amount: fee.default_value,
    }));

    return {
      destination: '',
      record_date: new Date().toISOString().split('T')[0],
      record_time: '',
      vessel_id: 0,
      trucking_company_id: 0,
      plate_number: '',
      contact_info: '',
      weight_1: 0,
      weight_2: 0,
      fees: defaultFees,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: name.includes('weight') || name.includes('_id') || name === 'created_by'
          ? Number(value)
          : value,
      },
    }));
  };

  handleFeeChangeFromDefinition = (feeName: string, amount: number) => {
    const updatedFees = [...this.state.formData.fees];
    const feeIndex = updatedFees.findIndex(f => f.fee_name === feeName);

    if (feeIndex !== -1) {
      updatedFees[feeIndex].amount = amount;
    } else {
      updatedFees.push({ fee_name: feeName, amount });
    }

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        fees: updatedFees,
      },
    }));
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.formData);
    this.props.onClose();
  };

  render() {
    const { isOpen, onClose, mode, truckingCompanies, vessels, feeList } = this.props;
    const { formData } = this.state;

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow p-6 relative overflow-y-auto max-h-[90vh]">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold capitalize mb-6">{mode} Record</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[ 
              { name: 'destination', label: 'Destination', type: 'text' },
              { name: 'record_date', label: 'Record Date', type: 'date' },
              { name: 'record_time', label: 'Record Time', type: 'time' },
              { name: 'plate_number', label: 'Plate Number', type: 'text' },
              { name: 'contact_info', label: 'Contact Info', type: 'text' },
              { name: 'weight_1', label: 'Weight 1', type: 'number' },
              { name: 'weight_2', label: 'Weight 2', type: 'number' },
            ].map(({ name, label, type }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="text-xs font-medium text-gray-700 mb-1">{label}</label>
                <input
                  name={name}
                  id={name}
                  type={type}
                  value={(formData as any)[name]}
                  onChange={this.handleChange}
                  min={name === 'record_date' ? new Date().toISOString().split('T')[0] : undefined}
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label htmlFor="trucking_company_id" className="text-xs font-medium text-gray-700 mb-1">Trucking Company</label>
              <select
                name="trucking_company_id"
                id="trucking_company_id"
                value={formData.trucking_company_id}
                onChange={this.handleChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">Select Company</option>
                {truckingCompanies.map((company) => (
                  <option key={company.id} value={company.id}>{company.company_name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="vessel_id" className="text-xs font-medium text-gray-700 mb-1">Vessel</label>
              <select
                name="vessel_id"
                id="vessel_id"
                value={formData.vessel_id}
                onChange={this.handleChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">Select Vessel</option>
                {vessels.map((vessel) => (
                  <option key={vessel.id} value={vessel.id}>{vessel.vessel_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Fees</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {feeList.map((feeDef) => {
                const existing = formData.fees.find(f => f.fee_name === feeDef.fee_name);
                const amount = existing ? existing.amount : feeDef.default_value;

                return (
                  <div key={feeDef.fee_name} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-700">
                      {feeDef.fee_name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => this.handleFeeChangeFromDefinition(feeDef.fee_name, Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm border rounded">Cancel</button>
            <button
              onClick={this.handleSubmit}
              className="px-4 py-2 text-sm rounded text-white bg-blue-600 hover:bg-blue-700"
            >
              {mode === 'edit' ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  truckingCompanies: state.truckingCompany.list || [],
  vessels: state.vessel.list || [],
  feeList: state.fee.list || [],
});

const mapDispatchToProps = {
  fetchTruckingCompanies,
  fetchVessels,
  fetchFees,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordModal);
