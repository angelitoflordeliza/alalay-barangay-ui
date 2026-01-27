const forms = {
  senior: `
    <div id="form-senior" class="specific-form">
        <div class="form-grid-3">
            <div class="form-group">
                <label>Region *</label>
                <select required><option value="">--Select Region--</option></select>
            </div>
            <div class="form-group">
                <label>Province *</label>
                <select required><option value="">--Select Province--</option></select>
            </div>
            <div class="form-group">
                <label>City/Town *</label>
                <select required><option value="">--Select City/Town--</option></select>
            </div>
        </div>

        <div class="form-grid-3">
            <div class="form-group">
                <label>First Name *</label>
                <input type="text" placeholder="Enter First Name" required>
            </div>
            <div class="form-group">
                <label>Middle Name</label>
                <input type="text" placeholder="Enter Middle Name">
            </div>
            <div class="form-group">
                <label>Last Name *</label>
                <input type="text" placeholder="Enter Last Name" required>
            </div>
        </div>

        <div class="form-group">
            <label>Address *</label>
            <input type="text" placeholder="Enter Address" required>
        </div>

        <div class="form-grid-3">
            <div class="form-group">
                <label>Telephone</label>
                <input type="tel" placeholder="Enter Telephone">
            </div>
            <div class="form-group">
                <label>Mobile No. *</label>
                <input type="tel" placeholder="Ex. +639412345678" required>
            </div>
            <div class="form-group">
                <label>E-mail Address</label>
                <input type="email" placeholder="Enter E-mail Address">
            </div>
        </div>

        <div class="form-grid-2">
            <div class="form-group">
                <label>Birthdate *</label>
                <input type="date" placeholder="mm/dd/yyyy" required>
            </div>
            <div class="form-group">
                <label>Place of Birth *</label>
                <input type="text" placeholder="Enter Place of Birth" required>
            </div>
        </div>

        <div class="form-grid-4">
            <div class="form-group">
                <label>Sex *</label>
                <select required><option value="">Choose option</option><option>Male</option><option>Female</option></select>
            </div>
            <div class="form-group">
                <label>Civil Status *</label>
                <select required><option value="">Choose option</option><option>Single</option><option>Married</option><option>Widowed</option><option>Separated</option></select>
            </div>
            <div class="form-group">
                <label>Blood Type *</label>
                <select required><option value="">Choose option</option><option>A</option><option>B</option><option>AB</option><option>O</option></select>
            </div>
            <div class="form-group">
                <label>Religion *</label>
                <select required><option value="">Choose option</option><option>Roman Catholic</option><option>Islam</option><option>Iglesia ni Cristo</option><option>Other</option></select>
            </div>
        </div>

        <div class="form-group">
            <label>Highest Educational Attainment *</label>
            <select required>
                <option value="">Choose option</option>
                <option>Elementary</option>
                <option>High School</option>
                <option>College</option>
                <option>Post Graduate</option>
                <option>Vocational</option>
                <option>None</option>
            </select>
        </div>

        <div class="form-grid-2">
            <div class="form-group">
                <label>GSIS</label>
                <input type="text" placeholder="Enter GSIS No.">
            </div>
            <div class="form-group">
                <label>SSS</label>
                <input type="text" placeholder="Enter SSS No.">
            </div>
            <div class="form-group">
                <label>TIN</label>
                <input type="text" placeholder="Enter TIN No.">
            </div>
            <div class="form-group">
                <label>PhilHealth</label>
                <input type="text" placeholder="Enter PhilHealth No.">
            </div>
        </div>

        <div class="form-grid-3">
            <div class="form-group">
                <label>Employment Status *</label>
                <select required><option value="">Choose option</option><option>Employed</option><option>Unemployed</option><option>Self-Employed</option></select>
            </div>
            <div class="form-group">
                <label>Classification *</label>
                <select required><option value="">Choose option</option><option>Indigent</option><option>Pensioner</option><option>Supported</option></select>
            </div>
            <div class="form-group">
                <label>Monthly Pension *</label>
                <select required><option value="">Choose Option</option><option>None</option><option>Below 5,000</option><option>5,000 - 10,000</option><option>Above 10,000</option></select>
            </div>
        </div>

        <div class="form-group">
            <label>In case of Emergency *</label>
            <input type="text" placeholder="Enter In case of Emergency" required>
        </div>
         <div class="form-group">
            <label>Contact *</label>
            <input type="tel" placeholder="Enter Contact Number" required>
        </div>
    </div>
  `,
  residency: `
    <div id="form-residency" class="specific-form">
        <div class="form-group">
            <label>Full Name *</label>
            <input type="text" placeholder="Enter Full Name" required>
        </div>
        <div class="form-group">
            <label>Address *</label>
            <input type="text" placeholder="Enter Address" required>
        </div>
        <div class="form-group">
            <label>Years of Residency *</label>
            <select required>
                <option value="">--Select--</option>
                <option value="less">Less than 4 years</option>
                <option value="more">4 years or more</option>
            </select>
        </div>
    </div>
  `,
  pension: `
    <div id="form-pension" class="specific-form">
        <h3>I. Basic Information</h3>
        <div class="form-grid-3">
            <div class="form-group">
                <label>Last Name *</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>First Name *</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Middle Name</label>
                <input type="text">
            </div>
        </div>
        <div class="form-grid-2">
             <div class="form-group">
                <label>Citizenship *</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Age *</label>
                <input type="number" required>
            </div>
        </div>
        <div class="form-group">
            <label>Address *</label>
            <input type="text" placeholder="House No. Street Barangay City/Municipality Province" required>
        </div>
        <div class="form-grid-3">
            <div class="form-group">
                <label>Sex *</label>
                <select required><option value="">Choose</option><option>Male</option><option>Female</option></select>
            </div>
            <div class="form-group">
                <label>Civil Status *</label>
                <select required><option value="">Choose</option><option>Single</option><option>Married</option><option>Widowed</option><option>Separated</option></select>
            </div>
            <div class="form-group">
                <label>Birthdate *</label>
                <input type="date" required>
            </div>
        </div>
        <div class="form-group">
            <label>Birthplace *</label>
            <input type="text" required>
        </div>
        <div class="form-group">
            <label>Living Arrangement *</label>
            <select required>
                <option value="">Choose</option>
                <option>Owned</option>
                <option>Living Alone</option>
                <option>Living with relatives</option>
                <option>Rent</option>
            </select>
        </div>

        <h3>II. Economic Status</h3>
        <div class="form-group">
            <label>Pensioner? *</label>
            <select required><option value="">Choose</option><option>Yes</option><option>No</option></select>
        </div>
        <div class="form-group">
            <label>If yes, how much?</label>
            <input type="text">
        </div>
        <div class="form-group">
            <label>Source</label>
            <select>
                <option value="">Choose</option>
                <option>GSIS</option>
                <option>SSS</option>
                <option>AFPSLAI</option>
                <option>Others</option>
            </select>
        </div>
        <div class="form-group">
            <label>Permanent Source of Income? *</label>
            <select required><option value="">Choose</option><option>Yes</option><option>None</option></select>
        </div>
        <div class="form-group">
            <label>Regular Support from Family? *</label>
            <select required><option value="">Choose</option><option>Yes</option><option>No</option></select>
        </div>
        <div class="form-group">
            <label>Type of Support</label>
            <input type="text" placeholder="Cash (How much/often) or In kind">
        </div>

        <h3>III. Health Condition</h3>
        <div class="form-group">
            <label>Has existing illness? *</label>
            <select required><option value="">Choose</option><option>Yes</option><option>No</option></select>
        </div>
        <div class="form-group">
            <label>If yes, please specify</label>
            <input type="text">
        </div>
    </div>
  `,
  clearance: `
    <div id="form-clearance" class="specific-form">
        <div class="form-group">
            <label>Full Name *</label>
            <input type="text" placeholder="Enter Full Name" required>
        </div>
        <div class="form-group">
            <label>Address *</label>
            <input type="text" placeholder="Enter Address" required>
        </div>
        <div class="form-group">
            <label>Purpose *</label>
            <input type="text" placeholder="Enter Purpose" required>
        </div>
    </div>
  `
};
