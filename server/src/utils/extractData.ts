import { isDataView } from "util/types";

const aadhaarIdentifiers = [
  'Unique Identification Authority of India',
  'Aadhaar',
  'VID:',
  'Government of India',
  'आधार'
  // 'Date of Birth', 'DOB',
  // 'Male', 'Female', 'Transgender',
];




export function extractFrontData(text: string) {
  const isAadhaar = aadhaarIdentifiers.some(keyword =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  if (!isAadhaar) {
    return null
  }

  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let name = '';
  let dob = '';
  let gender = '';
  let aadhaarNumber = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(line, 'line  = = = = = =');

    // Look for DOB
    if (/Date of Birth|DOB/i.test(line)) {
      const match = line.match(/(\d{2}\/\d{2}\/\d{4})/);
      if (match) {
        dob = match[1];

        // Try to grab name from the line before DOB
        if (i > 0) {
          const possibleName = lines[i - 1];
          console.log(possibleName, 'possible name  +++++++++++++++++');

          // Aadhaar names are usually in all caps
          if (/^[A-Za-z\s\.]{3,}$/.test(possibleName) && !/^(GOV|INDIA|DOB)/i.test(possibleName)) {
            name = possibleName;
            console.log(possibleName, 'possible name in if condition++++++++++++++++++++++');

          }
        }
      }
    }

    // Gender
    if (/male|female|transgender/i.test(line)) {
      gender = line.toLowerCase().includes('male') ? 'Male' :
        line.toLowerCase().includes('female') ? 'Female' :
          'Transgender';
    }

    // Aadhaar number - 12 digits without spaces
    const aadhaarMatch = line.replace(/\s/g, '').match(/\d{12}/);
    if (aadhaarMatch) {
      aadhaarNumber = aadhaarMatch[0];
    }
  }

  return { name, dob, gender, aadhaarNumber };

}


export function extractBackData(text: string) {
  const isAadhaar = aadhaarIdentifiers.some(keyword =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!isAadhaar) {
    return null
  }
  const lines = text.split('\n').map(line => line.trim());

  let address = '';
  let pincode = '';

  // Look for pincode pattern - 6 digit number
  for (const line of lines) {
    const pinMatch = line.match(/\b\d{6}\b/);
    if (pinMatch) {
      pincode = pinMatch[0];

      // Try to grab address from current and previous line
      const index = lines.indexOf(line);
      const prevLine = lines[index - 1] || '';
      const currLine = line;

      address = `${prevLine} ${currLine}`.trim();
      break;
    }
  }
  return { address, pincode };


}