import { getData } from "./data.js";

let { currentDate, events } = await getData();

async function getPastEvents(currentDate, events) {
  let pastEvents = [];

  for (let event of events) {
    // Filtramos los eventos que pasados
    if (event.date <= currentDate) {
      const assistancePercentage = (event.assistance / event.capacity) * 100;
      if (pastEvents.length < 3) {
        // Si todavia no hay 3 eventos en el array, agregamos el evento actual
        pastEvents.push({ name: event.name, assistancePercentage });
      } else {
        // Si ya hay 3 eventos en el array, comparamos el actual con el que tenga menor asistencia
        const minAssistanceEvent = pastEvents.reduce(
          (min, e) =>
            e.assistancePercentage < min.assistancePercentage ? e : min,
          pastEvents[0]
        );
        if (assistancePercentage > minAssistanceEvent.assistancePercentage) {
          // Si el evento actual tiene mayor asistencia que el evento con menor asistencia del array, lo reemplazamos
          pastEvents[pastEvents.indexOf(minAssistanceEvent)] = {
            name: event.name,
            assistancePercentage,
          };
        }
      }
    }
  }
  // Ordenamos el array en orden descendente de asistencia
  pastEvents.sort((a, b) => b.assistancePercentage - a.assistancePercentage);
  // Devolvemos un array de objetos con el nombre del evento y su porcentaje de asistencia
  return pastEvents.map((e) => ({
    name: e.name,
    assistancePercentage: `${e.assistancePercentage.toFixed(2)}%`,
  }));
}

// Llamamos a la función getData() y luego a getPastEvents() con sus valores
const pastEvents = await getPastEvents(currentDate, events);

// Iteramos sobre el array de objetos topEvents
const higEvents = [];
for (let event of pastEvents) {
  const eventString = `${event.name} : ${event.assistancePercentage}`;
  higEvents.push(eventString);
}

//Agregamos los datos a la tabla
document.getElementById("event-highest-percentage-one").innerHTML =
  higEvents[0];
document.getElementById("event-highest-percentage-two").innerHTML =
  higEvents[1];
document.getElementById("event-highest-percentage-three").innerHTML =
  higEvents[2];

async function getUpEvents(currentDate, events) {
  let upEvents = [];

  for (let event of events) {
    // Filtramos los eventos que van a venir
    if (event.date <= currentDate) {
      const assistancePercentage = (event.assistance / event.capacity) * 100;

      if (upEvents.length < 3) {
        // Si todavia no hay 3 eventos en el array, agregamos el evento actual
        upEvents.push({ name: event.name, assistancePercentage });
      } else {
        // Si ya hay 3 eventos en el array, comparamos el actual con el que tenga mayor asistencia
        const maxAssistanceEvent = upEvents.reduce(
          (max, e) =>
            e.assistancePercentage > max.assistancePercentage ? e : max,
          upEvents[0]
        );

        if (assistancePercentage < maxAssistanceEvent.assistancePercentage) {
          // Si el evento actual tiene menor asistencia que el evento con mayor asistencia del array, lo reemplazamos
          upEvents[upEvents.indexOf(maxAssistanceEvent)] = {
            name: event.name,
            assistancePercentage,
          };
        }
      }
    }
  }

  // Ordenamos el array en orden ascendente de asistencia
  upEvents.sort((a, b) => a.assistancePercentage - b.assistancePercentage);

  // Devolvemos un array de objetos con el nombre del evento y su porcentaje de asistencia
  return upEvents.map((e) => ({
    name: e.name,
    assistancePercentage: `${e.assistancePercentage.toFixed(2)}%`,
  }));
}

// Llamamos a la función getData() y luego a getUpEvents() con sus valores
const upEvents = await getUpEvents(currentDate, events);

// Iteramos sobre el array de objetos upEvents
const lowestEvents = [];
for (let event of upEvents) {
  const eventString = `${event.name} : ${event.assistancePercentage}`;
  lowestEvents.push(eventString);
}

//Agregamos los datos a la tabla
document.getElementById("event-lowest-porcentage-one").innerHTML =
  lowestEvents[0];
document.getElementById("event-lowest-porcentage-two").innerHTML =
  lowestEvents[1];
document.getElementById("event-lowest-porcentage-three").innerHTML =
  lowestEvents[2];

async function getCapacityEvents(currentDate, events) {
  let capacityEvents = [];
  for (let event of events) {
    if (capacityEvents.length < 3) {
      capacityEvents.push({ name: event.name, capacity: event.capacity });
    } else {
      const minCapacityEvent = capacityEvents.reduce(
        (min, e) => (e.capacity < min.capacity ? e : min),
        capacityEvents[0]
      );
      if (event.capacity > minCapacityEvent.capacity) {
        capacityEvents[capacityEvents.indexOf(minCapacityEvent)] = {
          name: event.name,
          capacity: event.capacity,
        };
      }
    }
  }

  // Ordenamos el array en orden descendente de capacidad
  capacityEvents.sort((a, b) => b.capacity - a.capacity);
  // Devolvemos un array de objetos con el nombre del evento y su capacidad
  return capacityEvents.map((e) => ({ name: e.name, capacity: e.capacity }));
}

const capacityEvents = await getCapacityEvents(currentDate, events);

const maxCapacityEvents = [];
for (let event of capacityEvents) {
  const eventString = `${event.name} : ${event.capacity}`;
  maxCapacityEvents.push(eventString);
}

//Agregamos los datos a la tabla
document.getElementById("event-larger-capacity-one").innerHTML =
  maxCapacityEvents[0];
document.getElementById("event-larger-capacity-two").innerHTML =
  maxCapacityEvents[1];
document.getElementById("event-larger-capacity-three").innerHTML =
  maxCapacityEvents[2];

const upcomingEventsFilter = events.filter((event) => event.date > currentDate);

const pastEventsFilter = events.filter((event) => event.date <= currentDate);

const upcomingByCategory = upcomingEventsFilter.reduce(
  (accumulator, current) => {
    const { category, estimate, price, capacity } = current;
    const revenue = estimate * price;
    const accCategory = accumulator.find(
      (event) => event.category === category
    );
    if (!accCategory) {
      const percentage = (estimate / capacity) * 100;
      return [
        ...accumulator,
        {
          category,
          estimate,
          revenue,
          capacity,
          percentage,
        },
      ];
    } else {
      const accCategoryIndex = accumulator.findIndex(
        (event) => event.category === category
      );
      accumulator[accCategoryIndex].estimate += estimate;
      accumulator[accCategoryIndex].revenue += revenue;
      accumulator[accCategoryIndex].capacity += capacity;
      accumulator[accCategoryIndex].percentage = (accumulator[accCategoryIndex].estimate / accumulator[accCategoryIndex].capacity) * 100;
      return accumulator
    }
  },
  []
);

console.log(upcomingByCategory);

const categoriesUp = upcomingByCategory.map(
  (upcomingEvent) => upcomingEvent.category
);
const revenuesUp = upcomingByCategory.map(
  (upcomingEvent) => upcomingEvent.revenue
);

const percentageUp = upcomingByCategory.map((upcomingEvent) => {
  return`${((upcomingEvent.estimate / upcomingEvent.capacity) * 100).toFixed(2)}%`;
});

const pastByCategory = pastEventsFilter.reduce(
  (accumulator, current) => {
    const { category, assistance, price, capacity } = current;
    const revenue = assistance * price;
    const accCategory = accumulator.find(
      (event) => event.category === category
    );
    if (!accCategory) {
      const percentage = (assistance / capacity) * 100;
      return [
        ...accumulator,
        {
          category,
          assistance,
          revenue,
          capacity,
          percentage,
        },
      ];
    } else {
      const accCategoryIndex = accumulator.findIndex(
        (event) => event.category === category
      );
      accumulator[accCategoryIndex].assistance += assistance;
      accumulator[accCategoryIndex].revenue += revenue;
      accumulator[accCategoryIndex].capacity += capacity;
      accumulator[accCategoryIndex].percentage = (accumulator[accCategoryIndex].assistance / accumulator[accCategoryIndex].capacity) * 100;
      return accumulator
    }
  },
  []
);

console.log(upcomingByCategory);

const categoryesPast = pastByCategory.map(
  (pastEvent) => pastEvent.category
);
const revenuesPastEvent = pastByCategory.map(
  (pastEvent) => pastEvent.revenue
);

const percentagePast = pastByCategory.map((pastEvent) => {
  return`${((pastEvent.assistance / pastEvent.capacity) * 100).toFixed(2)}%`;
});

console.log(pastByCategory);

document.getElementById("event-category-up-one").innerHTML = categoriesUp[0];
document.getElementById("event-category-up-two").innerHTML = categoriesUp[1];
document.getElementById("event-category-up-three").innerHTML = categoriesUp[2];
document.getElementById("event-category-up-four").innerHTML = categoriesUp[3];
document.getElementById("event-category-up-five").innerHTML = categoriesUp[4];
document.getElementById("event-category-up-six").innerHTML = categoriesUp[5];

document.getElementById("event-revenues-up-one").innerHTML = revenuesUp[0];
document.getElementById("event-revenues-up-two").innerHTML = revenuesUp[1];
document.getElementById("event-revenues-up-three").innerHTML = revenuesUp[2];
document.getElementById("event-revenues-up-four").innerHTML = revenuesUp[3];
document.getElementById("event-revenues-up-five").innerHTML = revenuesUp[4];
document.getElementById("event-revenues-up-six").innerHTML = revenuesUp[5];

document.getElementById("event-percentage-up-one").innerHTML = percentageUp[0];
document.getElementById("event-percentage-up-two").innerHTML = percentageUp[1];
document.getElementById("event-percentage-up-three").innerHTML = percentageUp[2];
document.getElementById("event-percentage-up-four").innerHTML = percentageUp[3];
document.getElementById("event-percentage-up-five").innerHTML = percentageUp[4];
document.getElementById("event-percentage-up-six").innerHTML = percentageUp[5];

document.getElementById("event-category-past-one").innerHTML = categoryesPast[0];
document.getElementById("event-category-past-two").innerHTML = categoryesPast[1];
document.getElementById("event-category-past-three").innerHTML = categoryesPast[2];
document.getElementById("event-category-past-four").innerHTML = categoryesPast[3];
document.getElementById("event-category-past-five").innerHTML = categoryesPast[4];
document.getElementById("event-category-past-six").innerHTML = categoryesPast[5];
document.getElementById("event-category-past-seven").innerHTML = categoryesPast[6];

document.getElementById("event-revenues-past-one").innerHTML = revenuesPastEvent[0];
document.getElementById("event-revenues-past-two").innerHTML = revenuesPastEvent[1];
document.getElementById("event-revenues-past-three").innerHTML = revenuesPastEvent[2];
document.getElementById("event-revenues-past-four").innerHTML = revenuesPastEvent[3];
document.getElementById("event-revenues-past-five").innerHTML = revenuesPastEvent[4];
document.getElementById("event-revenues-past-six").innerHTML = revenuesPastEvent[5];
document.getElementById("event-revenues-past-seven").innerHTML = revenuesPastEvent[6];

document.getElementById("event-percentage-past-one").innerHTML = percentagePast[0];
document.getElementById("event-percentage-past-two").innerHTML = percentagePast[1];
document.getElementById("event-percentage-past-three").innerHTML = percentagePast[2];
document.getElementById("event-percentage-past-four").innerHTML = percentagePast[3];
document.getElementById("event-percentage-past-five").innerHTML = percentagePast[4];
document.getElementById("event-percentage-past-six").innerHTML = percentagePast[5];
document.getElementById("event-percentage-past-seven").innerHTML = percentagePast[6];
