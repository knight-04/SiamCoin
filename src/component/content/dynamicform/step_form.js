const stepFormData = {
  "workflowId": "2618b940-f86b-4880-9f14-611b9ae405c6",
  "name": "แบบฟอร์มสมัครงาน",
  "description": "แผนการทำงานสำหรับการสมัครงานออนไลน์",
  "steps": [
    {
      "stepId": "step-001",
      "stepName": "ข้อมูลส่วนตัว",
      "stepDescription": "กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วน",
      "order": 1,
      "forms": [
        {
          "formId": "form-001",
          "field": "ชื่อ-นามสกุล",
          "type": "text",
          "required": true
        },
        {
          "formId": "form-002",
          "field": "วันเกิด",
          "type": "date",
          "required": true
        },
        {
          "formId": "form-003",
          "field": "อายุ",
          "type": "number",
          "required": true
        },
        {
          "formId": "form-004",
          "field": "ตำแหน่งที่สนใจ",
          "type": "select",
          "required": true,
          "options": [
            { "label": "Frontend Developer", "value": "frontend" },
            { "label": "Backend Developer", "value": "backend" },
            { "label": "Full Stack Developer", "value": "fullstack" }
          ]
        },
        {
          "formId": "form-005",
          "field": "เพศ",
          "type": "radio",
          "required": true,
          "options": [
            { "label": "ชาย", "value": "male" },
            { "label": "หญิง", "value": "female" },
            { "label": "ไม่ระบุ", "value": "other" }
          ]
        }
      ]
    },
    {
      "stepId": "step-002",
      "stepName": "ทักษะและความสามารถ",
      "stepDescription": "ระบุทักษะและความสามารถของคุณ",
      "order": 2,
      "forms": [
        {
          "formId": "form-005",
          "field": "ทักษะด้านโปรแกรมมิ่ง",
          "type": "checkbox",
          "required": true,
          "options": [
            { "label": "JavaScript", "value": "js" },
            { "label": "Python", "value": "python" },
            { "label": "Java", "value": "java" },
            { "label": "C++", "value": "cpp" }
          ]
        },
        {
          "formId": "form-006",
          "field": "ระดับภาษาอังกฤษ",
          "type": "slider",
          "required": true,
          "min": 0,
          "max": 10,
          "marks": {
            0: "Beginner",
            5: "Intermediate",
            10: "Advanced"
          }
        },
        {
          "formId": "form-007",
          "field": "ช่วงเงินเดือนที่ต้องการ",
          "type": "dateRange",
          "required": true
        },
        {
          "formId": "form-008",
          "field": "สามารถเริ่มงานได้ทันที",
          "type": "switch",
          "required": true,
          "checkedLabel": "ได้",
          "uncheckedLabel": "ไม่ได้"
        }
      ]
    },
    {
      "stepId": "step-003",
      "stepName": "เอกสารและรายละเอียดเพิ่มเติม",
      "stepDescription": "อัพโหลดเอกสารที่จำเป็นและให้ข้อมูลเพิ่มเติม",
      "order": 3,
      "forms": [
        {
          "formId": "form-009",
          "field": "เรซูเม่",
          "type": "file",
          "required": true,
          "accept": ".pdf,.doc,.docx",
          "maxSize": 5,
          "maxCount": 1
        },
        {
          "formId": "form-010",
          "field": "จดหมายแนะนำตัว",
          "type": "textarea",
          "required": true,
          "maxLength": 500
        },
        {
          "formId": "form-011",
          "field": "เวลาที่สะดวกสัมภาษณ์",
          "type": "timePicker",
          "required": true,
          "format": "HH:mm"
        },
        {
          "formId": "form-012",
          "field": "ที่อยู่",
          "type": "cascader",
          "required": true,
          "options": [
            {
              "label": "กรุงเทพฯ",
              "value": "bkk",
              "children": [
                {
                  "label": "บางรัก",
                  "value": "bangrak"
                },
                {
                  "label": "ปทุมวัน",
                  "value": "pathumwan"
                }
              ]
            }
          ]
        },
        {
          "formId": "form-013",
          "field": "ประเมินตนเอง",
          "type": "rate",
          "required": true,
          "defaultValue": 3
        },
        {
          "formId": "form-014",
          "field": "เลือกสีที่ชอบ",
          "type": "colorPicker",
          "required": false
        }
      ]
    }
  ],
  "createdBy": "Admin",
  "updatedBy": "Admin"
};

export default stepFormData;