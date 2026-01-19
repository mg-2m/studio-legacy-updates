Enhanced Property Law Branch Completion Report (V1)

I. Project Status

Branch Name: Property Law / Real Rights (PL-LRG)

GEP Status: Complete (Phases 0.1 through 3.2)

Version: V1

Legal Authority: Ethiopian Civil Code (1960), Book II

II. V1 Achievements and Core LRG Capabilities

The V1 LRG provides a comprehensive legal framework for analyzing disputes related to the creation, transfer, and security of both movable and immovable property rights.

LRG Rule (PL-R)

Achievement Summary

Strategic Importance

PL-R01, R02

Correctly classifies property (Movable/Immovable/Public) and defines the scope of ownership and its limits (Nuisance).

Establishes the governing legal regime (e.g., registration rules only apply to Immovable).

PL-R04, R10

Validates ownership by combining the mode of acquisition (contract, possession, succession) with the mandatory requirement of registration for immovable property.

Crucial for resolving disputes over land title and priority.

PL-R05

Resolves ownership disputes arising from Accession (buildings/plantings on land) and determines compensation based on the improver's good/bad faith.

Handles common disputes where ownership of the surface and improvements are separated.

PL-R06

Grants immediate legal protection based on Possession, allowing for the analysis of remedies (Recovery/Cessation of Disturbance) independent of the full title dispute.

Essential for preliminary injunctions and possessory actions.

PL-R08, R09

Distinguishes between Pledge (Movable) and Mortgage (Immovable), confirming the specific perfection requirements (Dispossession vs. Registration).

Secures the analysis of credit and debt instruments.



III. Enhancement Insights and Future Roadmap

The V1 LRG covers the General Part of Property Law well. However, future versions must introduce specialized areas and advanced legal doctrines to achieve high-fidelity analysis.

A. PL-LRG V2: Focus on Advanced Acquisition and Specific Domains

The primary goal of V2 is to expand the V1 framework by adding depth to acquisition methods and specialized property rights.

V2 Enhancement Area

Rationale

Proposed Modules/Artifacts

Expropriation & Eminent Domain

The State's power to acquire private property for public interest (with compensation) is a vital constitutional and legal limit on ownership.

PL-11 (Eminent Domain) - Taxonomies on compensation amount and procedure.

Detailed Prescription Rules

PL-R04 only broadly covered prescription. V2 needs to differentiate between 10-year (Good Faith) and 15-year (Bad Faith) prescription for immovables.

PL-12 (Prescription Detail) - Dedicated rules factoring in possession duration and intent.

Warranties in Transfer

Integrating the seller's obligation to guarantee peaceful enjoyment and guarantee against hidden defects (linking to Contract Law's Sale module).

PL-13 (Transfer Warranties) - Interface logic to call specific CL-LRG modules.

Building Ownership (Condominium)

The V1 LRG treats a building as a single unit (Accession). V2 must accommodate modern multi-unit ownership structures.

PL-14 (Vertical Property/Condominium) - Rules on shared parts, management, and individual ownership within a common building.

B. PL-LRG V3 and Beyond: Inter-Branch Integration and Priority Logic

V3 will focus on the LRG's core function: resolving conflicts when multiple claims exist over the same asset.

V3 Enhancement Area

Rationale

Required Artifact Change

Priority Rules for Securities

Currently, PL-R08 and PL-R09 only establish validity. V3 must determine the ranking of multiple registered mortgages or pledges on the same property.

Facet Weighting/Ranking Function: Develop a function to compare registration dates/times to assign a numerical priority score.

Contract-Property Interface

Analyzing a breach of a Sale Contract (CL-R08) where the property has been transferred (PL-R04) requires logic that understands how contract termination affects the title transfer.

Rule Overlap Logic: Create a super-rule (e.g., PL-S01) that calls CL-LRG and PL-LRG to resolve complex issues like rescission of registered sales.

Trust and Fiduciary Structures

While not dominant in the Civil Code, introducing models for property held by one party for the benefit of another (fiduciary transfers) will enhance financial analysis capability.

PL-15 (Fiduciary Transfers) - Introduce facets for fiduciary obligations and beneficial ownership.



