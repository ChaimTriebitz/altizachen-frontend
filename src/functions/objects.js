export const objects = {
   getDotNotationDeepValue,
   setDotNotationDeepValue,
   areCommonFieldValuesEqual,
   getChangedProperties,
   convertToDotNotation,
   updateObjectById,
   areAllFieldsEmpty,
   isEmptyObject,
   replacePropertiesWithObjectValues,
   evaluateCodeInString
}

function replacePropertiesWithObjectValues(obj, str) {
   const regex = /{{(.*?)}}/g;
   return str.replace(regex, (match, property) => {
      const trimmedProperty = property.trim();
      return obj.hasOwnProperty(trimmedProperty) ? obj[trimmedProperty] : match
   });
}

function evaluateCodeInString(str) {
   const regex = /\{\*\{(.*?)\}\*\}/g;
   return str.replace(regex, (match, code) => {
      try {
         // Using Function constructor to safely execute the code
         // Note: Avoid using this with untrusted input as it can be dangerous
         const result = new Function(`return (${code})`)();
         return result;
      } catch (error) {
         console.error("Error while evaluating code:", error);
         return match; // Return the original match if there's an error
      }
   });
}

function isEmptyObject(obj) {
   return obj !== null && typeof obj === "object" && Object.keys(obj).length === 0;
}

function areAllFieldsEmpty(arrayOfObjects) {
   for (const obj of arrayOfObjects) {
      const keys = Object.keys(obj)
      for (const key of keys) {
         if (obj[key] !== "") {
            return false
         }
      }
   }
   return true
}

function getDotNotationDeepValue(data, path) {
   const pathArray = path.split(".")
   let value = data
   for (const key of pathArray) {
      if (key in value) value = value[key]
      else return ''
   }
   return isEmptyObject(value) ? '' : value
}

/**
 * 
 * @param {Object} {
 * row
 * } 
 * @param {Object}{
 * keys:values,
 * }  
 * @returns {Object} {
 * updatedRow
 * }
 */

function setDotNotationDeepValue(data, propertyValueObject) {
   // console.log(data, propertyValueObject);
   const updatedObj = JSON.parse(JSON.stringify(data));
   const processProperty = (targetObj, property, value) => {
      const properties = property.split('.');

      if (properties.length === 1) {
         targetObj[properties[0]] = value;
      } else {
         const [currentProperty, ...remainingProperties] = properties;
         if (!targetObj.hasOwnProperty(currentProperty) || typeof targetObj[currentProperty] !== 'object') {
            targetObj[currentProperty] = {};
         }
         processProperty(targetObj[currentProperty], remainingProperties.join('.'), value);
      }
   };

   for (const property in propertyValueObject) {
      if (propertyValueObject.hasOwnProperty(property)) {
         const value = propertyValueObject[property];
         processProperty(updatedObj, property, value);
      }
   }

   return updatedObj;
}


function areCommonFieldValuesEqual(obj1, obj2, initialObj = {}) {
   function isEqual(value1, value2) {
      if (value1 === value2) {
         return true;
      }

      if (value1 === null && value2 === null) {
         return true;
      }

      if (typeof value1 === 'object' && typeof value2 === 'object') {
         return areCommonFieldValuesEqual(value1, value2);
      }

      return false;
   }

   for (let key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
         if (!isEqual(obj1[key], obj2[key])) {
            return true;
         }

         if (!initialObj.hasOwnProperty(key)) {
            initialObj[key] = obj1[key];
         }

         if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            if (!initialObj.hasOwnProperty(key)) {
               initialObj[key] = Array.isArray(obj1[key]) ? [] : {};
            }
            if (areCommonFieldValuesEqual(obj1[key], obj2[key], initialObj[key])) {
               delete initialObj[key]; // Remove the key if there was no change
            } else {
               return true; // Return true if a nested field changed
            }
         }
      }
   }

   for (let key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
         return true;
      }
   }

   return Object.keys(initialObj).length === 0;
}










function getChangedProperties(prev, changed) {
   const changedProperties = {}
   function findChangedProperties(prevObj, changedObj, path = '') {
      for (let key in prevObj) {
         if (prevObj.hasOwnProperty(key)) {
            const newPath = path ? `${path}.${key}` : key
            if (typeof prevObj[key] === 'object' && typeof changedObj[key] === 'object') {
               if (Array.isArray(prevObj[key]) || Array.isArray(changedObj[key])) {
                  if (JSON.stringify(prevObj[key]) !== JSON.stringify(changedObj[key])) {
                     changedProperties[newPath] = changedObj[key]
                  }
               } else {
                  findChangedProperties(prevObj[key], changedObj[key], newPath)
               }
            } else if (prevObj[key] !== changedObj[key]) {
               changedProperties[newPath] = changedObj[key]
            }
         }
      }
   }

   findChangedProperties(prev, changed);
   return changedProperties;
}

function convertToDotNotation(obj, prefix = '') {
   let flattenedObj = {};
   for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
         let newKey = prefix ? `${prefix}.${key}` : key;

         if (typeof obj[key] === 'object' && obj[key] !== null) {
            let nestedObj = convertToDotNotation(obj[key], newKey);
            flattenedObj = { ...flattenedObj, ...nestedObj };
         } else {
            flattenedObj[newKey] = obj[key];
         }
      }
   }

   return flattenedObj;
}

function updateObjectById(array, id, newData) {
   const index = array.findIndex(obj => obj.id === id);
   if (index === -1) {
      // ID not found in the array
      return array;
   } else {
      const updatedObject = { ...array[index], ...newData };
      const updatedArray = [...array];
      updatedArray[index] = updatedObject;
      return updatedArray;
   }
}