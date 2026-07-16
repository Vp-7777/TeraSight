# TeraSight: Product Practicality & Real-World Expansion Blueprint

To transition TeraSight from a high-fidelity prototype dashboard into a highly practical, widely adopted production system, we must address **how data is gathered in the field, how weights are calculated accurately, and how the platform delivers concrete financial return (ROI)**.

Below is the blueprint for real-world implementation.

---

## 1. Practical Data Ingestion Channels (How we get the photos)

Deploying dedicated drones everywhere is expensive. In practice, we recommend a **hybrid three-tier data ingestion pipeline**:

```
                  ┌────────────────────────────────────────┐
                  │      TeraSight Ingestion Pipeline       │
                  └────────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Fixed Bridge    │       │ Citizen Mobile   │       │ Scheduled Drone  │
│  CCTV Streams    │       │ Crowdsourcing    │       │ Telemetry Scans  │
│ (24/7 Automated) │       │ (Low-cost/Scale) │       │ (High-precision) │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

### A. Fixed Bridge CCTV Surveillance (Highly Practical)
* **How it works**: Mount low-cost, weatherproof IP cameras underneath bridges spanning major waterways (like the Tapi River or Yamuna canals). 
* **Implementation**: The camera sends a video feed or snapshots every 15 minutes to the FastAPI `/api/analyze` endpoint.
* **Benefit**: 24/7 continuous monitoring with zero human intervention.

### B. Citizen & Field-Worker Mobile Reporting (Zero Infrastructure Cost)
* **How it works**: Develop a progressive web app (PWA) where sanitation workers or citizens take photos of trash heaps, which are automatically tagged with GPS coordinates.
* **Benefit**: Massive crowdsourced telemetry data. Encourages public engagement.

### C. Precision Drone Audits (High-Fidelity verification)
* **How it works**: Run drone flights once a month over specific GIDC industrial corridors to verify restoration claims and mint ESG carbon certificates.

---

## 2. Dynamic Volumetric Weight Estimation Algorithm

To estimate weight from a flat 2D image, we combine **Object Detection, Semantic Segmentation, and Volumetric Density Heuristics**:

$$\text{Weight (kg)} = \text{Pixel Area } (m^2) \times \text{Average Heap Height } (m) \times \text{Packing Density } (kg/m^3)$$

### The Calculation Pipeline:
1. **Type Classification**: YOLOv8 detects the primary material (e.g., loose plastic bottles).
2. **Volumetric Density Mapping**: The system maps the material to its dry bulk density coefficient:
   * **Loose PET Plastics**: $\approx 24 \text{ kg/m}^3$
   * **Mixed Municipal Waste**: $\approx 150 \text{ kg/m}^3$
   * **Organic/Wet Waste**: $\approx 450 \text{ kg/m}^3$
3. **Segmentation Area**: SAM (Segment Anything Model) counts the pixels of the trash contour, calibrated against a reference target size (e.g., bridge pillars or canal width) to estimate the heap area in square meters.
4. **Height Coefficient**: We apply a standard trash pile shape profile (e.g., conical shape coefficient of $1/3$ or flat heap coefficient of $0.8$ based on depth constraints).

---

## 3. Creating Market Appeal: Will it be liked by all?

To make TeraSight liked by city authorities, corporations, and citizens, the platform must present a **clear value proposition**:

| Stakeholder Group | Core Driver | How TeraSight Delivers |
| :--- | :--- | :--- |
| **City Commissioners** | Budget Savings & Cleanliness Rankings | **Material Recovery ROI**: Estimates resale value of sorted plastics to local recycling centers to offset cleanup budgets. |
| **ESG / Corporations** | Verified Sustainability Badges | **Signed ESG Proof-of-Restoration Certificates** backed by cryptographic hashes, ready for third-party audits. |
| **Local Citizens** | Pride of living in a clean area | **Neighborhood Cleanliness Index**: A public scoreboard showing the cleanup progress of local wards, gamifying civic pride. |

---

## 4. Next Implementation Milestones

To make the code base practically functional in the next phase, we will:
1. **Build the live API fetch client** in the Next.js frontend, connecting the GIS map to the seeded PostgreSQL database.
2. **Integrate the bulk weight algorithm** in the backend `/api/analyze` route so that uploaded scan summaries are calculated dynamically based on detected class densities.
