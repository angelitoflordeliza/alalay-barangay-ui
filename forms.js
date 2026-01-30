const forms = {
    senior: `
    <div id="form-senior" class="specific-form">
        <h3>I. Basic Information</h3>
        <div class="form-grid-3">
            <div class="form-group">
                <label>First Name <span style="color:red">*</span></label>
                <input 
                    type="text"
                    placeholder="Enter First Name"
                    required
                    data-assistant-label="Please enter your First Name. / Pakilagay ang iyong Pangalan."
                    data-tts-label="Please enter your First Name. Paki lahguy aang ihh yong Pangalan."
                >
            </div>
            <div class="form-group">
                <label>Middle Name</label>
                <input type="text" placeholder="Enter Middle Name">
            </div>
            <div class="form-group">
                <label>Last Name <span style="color:red">*</span></label>
                <input 
                    type="text"
                    placeholder="Enter Last Name"
                    required
                    data-assistant-label="Please enter your Last Name. / Pakilagay ang iyong Apelyido."
                    data-tts-label="Please enter your Last Name. Paki lahguy aang ihh yong A pel yih doh."
                >
            </div>
        </div>

        <div class="form-group">
            <label>Address <span style="color:red">*</span></label>
            <input 
                type="text"
                placeholder="Enter Address"
                required
                data-assistant-label="Please enter your complete address. / Pakilagay ang iyong kumpletong address."
                data-tts-label="Please enter your complete address. Paki lahguy aang ihh yong kom pleh tong address."
            >
        </div>

        <div class="form-grid-3">
            <div class="form-group">
                <label>Telephone</label>
                <input
                    type="tel"
                    placeholder="Telephone"
                    inputmode="numeric"
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                >
            </div>

            <div class="form-group">
                <label>Mobile No. <span style="color:red">*</span></label>
                <input 
                    type="tel"
                    inputmode="numeric"
                    data-assistant-label="Please enter your Mobile Number. / Pakilagay ang iyong Mobile Number."
                    data-tts-label="Please enter your Mobile Number. Paki lahguy aang ihh yong Mobile Number."
                    placeholder="Ex. +639412345678"
                    maxlength="13"
                    required
                    oninput="this.value = this.value.replace(/[^0-9+]/g, '')"
                >
            </div>
            <div class="form-group">
                <label>E-mail Address</label>
                <input type="email" placeholder="Enter E-mail Address">
            </div>
        </div>

        <div class="form-grid-2">
            <div class="form-group">
                <label>Birthdate <span style="color:red">*</span></label>
                <input 
                    type="date"
                    placeholder="mm/dd/yyyy"
                    required
                    data-assistant-label="Please enter your birthdate. / Pakilagay ang iyong petsa ng kapanganakan."
                    data-tts-label="Please enter your birthdate. Paki lahguy aang ihh yong pet sah nang ka panga nakan."
                >
            </div>
            <div class="form-group">
                <label>Place of Birth <span style="color:red">*</span></label>
                <input 
                    type="text"
                    placeholder="Enter Place of Birth"
                    required
                    data-assistant-label="Please enter your place of birth. / Pakilagay ang iyong lugar ng kapanganakan."
                    data-tts-label="Please enter your place of birth. Paki lahguy aang ihh yong lugar nang ka panga nakan."
                >
            </div>
        </div>

        <div class="form-grid-4">
            <div class="form-group">
                <label>Sex <span style="color:red">*</span></label>
                <select 
                    required
                    data-assistant-label="Please state your gender. / Pakisabi ang iyong kasarian."
                    data-tts-label="Please state your gender. Paki lahguy aang ihh yong casa riih an."
                >
                    <option value="">Choose option</option>
                    <option>Male / Lalaki</option>
                    <option>Female / Babae </option>
                </select>
            </div>
            <div class="form-group">
                <label>Civil Status <span style="color:red">*</span></label>
                <select 
                    required
                    data-assistant-label="Please enter your civil status. / Pakilagay ang iyong katayuang sibil."
                    data-tts-label="Please enter your civil status. Paki lahguy aang ihh yong kah tah yuh aang sibil."
                >
                    <option value="">Choose option</option>
                    <option>Single / Walang Asawa</option>
                    <option>Married / May Asawa</option>
                    <option>Widowed / Byudo o Byuda</option>
                    <option>Separated / Hiwalay</option>
                </select>
            </div>
            <div class="form-group">
                <label>Blood Type <span style="color:red">*</span></label>
                <select 
                    required
                    data-assistant-label="Please enter your Blood Type. / Pakilagay ang iyong Blood Type."
                    data-tts-label="Please enter your Blood Type. Paki lahguy aang ihh yong Blood Type."
                >
                    <option value="">Choose option</option>
                    <option>A</option>
                    <option>B</option>
                    <option>AB</option>
                    <option>O</option>
                </select>
            </div>
            <div class="form-group">
                <label>Religion <span style="color:red">*</span></label>
                <select 
                    required
                    data-assistant-label="Please enter your Religion. / Pakilagay ang iyong Relihiyon."
                    data-tts-label="Please enter your Religion. Paki lahguy aang ihh yong Relih hihh yon."
                >
                    <option value="">Choose option</option>
                    <option>Roman Catholic</option>
                    <option>Islam</option>
                    <option>Iglesia ni Cristo</option>
                    <option>Other</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label>Highest Educational Attainment <span style="color:red">*</span></label>
            <select 
                required
                data-assistant-label="Please select your Highest Educational Attainment. / Pakipili ang iyong Pinakamataas na Nakamit na Pang-edukasyon."
                data-tts-label="Please select your Highest Educational Attainment. Paki pee lee aang ihh yong Pina ka-mata us nah Nah ka mitt nah Pang e do cash on."
            >
                <option value="">Choose option</option>
                <option>Elementary</option>
                <option>High School</option>
                <option>College</option>
                <option>Post Graduate</option>
                <option>Vocational</option>
                <option>None</option>
            </select>
        </div>

        <h3>II. Economic Status</h3>
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
                <label>Employment Status <span style="color:red">*</span></label>
                <select 
                    required
                    data-assistant-label="Please enter your Employment Status. / Pakilagay ang iyong Katayuan sa Pagtatrabaho."
                    data-tts-label="Please enter your Employment Status. Paki lahguy aang ihh yong Katayuan sah Pagta trabaho."
                >
                    <option value="">Choose option</option>
                    <option>Employed</option>
                    <option>Unemployed</option>
                    <option>Self-Employed</option>
                </select>
            </div>
            <div class="form-group">
                <label>Classification <span style="color:red">*</span></label>
                <select required><option value="">Choose option</option><option>Indigent</option><option>Pensioner</option><option>Supported</option></select>
            </div>
            <div class="form-group">
                <label>Monthly Pension <span style="color:red">*</span></label>
                <select required><option value="">Choose Option</option><option>None</option><option>Below 5,000</option><option>5,000 - 10,000</option><option>Above 10,000</option></select>
            </div>
        </div>

        <h3>III. Emergency Contact</h3>
        <div class="form-group">
            <label>Emergency Contact Person <span style="color:red">*</span></label>
            <input type="text" placeholder="Enter In case of Emergency" required>
        </div>
        <div class="form-group">
            <label>Contact Number of Emergency Person <span style="color:red">*</span></label>
            <input type="tel" placeholder="Enter Contact Number" required>
        </div>
        <div>
            <label>All fields with asterisk (<span style="color:red">*</span>) are required to be answered.</label><br>
            <label style="font-style: italic;">Ang lahat ng mga patlang na may asterisk (<span style="color:red">*</span>) ay kinakailangang masagot.</label>
        </div>
    </div>
  `,
    clearance: `
    <div id="form-clearance" class="specific-form">
        <div class="form-group">
            <label>Full Name <span style="color:red">*</span></label>
            <input type="text" placeholder="Enter Full Name" required>
        </div>
        <div class="form-group">
            <label>Address <span style="color:red">*</span></label>
            <input type="text" placeholder="Enter Address" required>
        </div>
        <div class="form-group">
            <label>Purpose <span style="color:red">*</span></label>
            <input type="text" placeholder="Enter Purpose" required>
        </div>
        <div>
            <label>All fields with asterisk (<span style="color:red">*</span>) are required to be answered.</label><br>
            <label style="font-style: italic;">Ang lahat ng mga patlang na may asterisk (<span style="color:red">*</span>) ay kinakailangang masagot.</label>
        </div>
    </div>
  `,
    residency: `
    <div id="form-residency" class="specific-form">
        <div class="form-group">
            <label>Full Name <span style="color:red">*</span></label>
            <input type="text" placeholder="Enter Full Name" required>
        </div>
        <div class="form-group">
            <label>Address <span style="color:red">*</span></label>
            <input type="text" placeholder="Enter Address" required>
        </div>
        <div class="form-group">
            <label>Years of Residency <span style="color:red">*</span></label>
            <select required>
                <option value="">--Select--</option>
                <option value="less">Less than 4 years</option>
                <option value="more">4 years or more</option>
            </select>
        </div>
        <div>
            <label>All fields with asterisk (<span style="color:red">*</span>) are required to be answered.</label><br>
            <label style="font-style: italic;">Ang lahat ng mga patlang na may asterisk (<span style="color:red">*</span>) ay kinakailangang masagot.</label>
        </div>
    </div>
  `,
    pension: `
    <div id="form-pension" class="specific-form">
        <h3>I. Basic Information</h3>
        <div class="form-grid-3">
            <div class="form-group">
                <label>First Name <span style="color:red">*</span></label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Middle Name</label>
                <input type="text">
            </div>
            <div class="form-group">
                <label>Last Name <span style="color:red">*</span></label>
                <input type="text" required>
            </div>
        </div>
        <div class="form-grid-2">
             <div class="form-group">
                <label>Citizenship <span style="color:red">*</span></label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Age <span style="color:red">*</span></label>
                <input type="number" required>
            </div>
        </div>
        <div class="form-group">
            <label>Address <span style="color:red">*</span></label>
            <input type="text" placeholder="House No. Street Barangay City/Municipality Province" required>
        </div>
        <div class="form-grid-3">
            <div class="form-group">
                <label>Sex <span style="color:red">*</span></label>
                <select required><option value="">Choose</option><option>Male</option><option>Female</option></select>
            </div>
            <div class="form-group">
                <label>Civil Status <span style="color:red">*</span></label>
                <select required><option value="">Choose</option><option>Single</option><option>Married</option><option>Widowed</option><option>Separated</option></select>
            </div>
            <div class="form-group">
                <label>Birthdate <span style="color:red">*</span></label>
                <input type="date" required>
            </div>
        </div>
        <div class="form-group">
            <label>Birthplace <span style="color:red">*</span></label>
            <input type="text" required>
        </div>
        <div class="form-group">
            <label>Living Arrangement <span style="color:red">*</span></label>
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
            <label>Pensioner? <span style="color:red">*</span></label>
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
            <label>Permanent Source of Income? <span style="color:red">*</span></label>
            <select required><option value="">Choose</option><option>Yes</option><option>None</option></select>
        </div>
        <div class="form-group">
            <label>Regular Support from Family? <span style="color:red">*</span></label>
            <select required><option value="">Choose</option><option>Yes</option><option>No</option></select>
        </div>
        <div class="form-group">
            <label>Type of Support</label>
            <input type="text" placeholder="Cash (How much/often) or In kind">
        </div>

        <h3>III. Health Condition</h3>
        <div class="form-group">
            <label>Has existing illness? <span style="color:red">*</span></label>
            <select id="hasIllness" required>
                <option value="">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>
        <div class="form-group">
            <label>If yes, please specify</label>
            <input type="text" id="illnessSpecify" disabled>
        </div>
        <div>
            <label>All fields with asterisk (<span style="color:red">*</span>) are required to be answered.</label><br>
            <label style="font-style: italic;">Ang lahat ng mga patlang na may asterisk (<span style="color:red">*</span>) ay kinakailangang masagot.</label>
        </div>
    </div>
  `
};
